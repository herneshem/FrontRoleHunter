import { Component, OnInit } from '@angular/core';
import { WsService } from '../../services/ws-service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-live',
  templateUrl: './live.html',
   styles: ``
})
export class Live implements OnInit {

  peer!: RTCPeerConnection;
  roomId = 'sala-1';
  localStream?: MediaStream;

  // Subject para pruebas sin WebSocket
  signalBus = new Subject<any>();

  constructor(private ws: WsService) { }

  async ngOnInit() {
    await this.initLocalMedia();
    this.initWebSocket();
    this.createPeer();

    // Suscripción a signalBus para pruebas locales (sin backend)
    this.signalBus.subscribe(msg => this.handleSignal(msg));
  }

  async initLocalMedia() {
    this.localStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    });
    const video = document.getElementById("localVideo") as HTMLVideoElement;
    if (video) video.srcObject = this.localStream;
  }

  createPeer() {
    this.peer = new RTCPeerConnection({
      iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
    });

    this.peer.onicecandidate = (event) => {
      if (event.candidate) {
        this.ws.send(this.roomId, { type: 'candidate', candidate: event.candidate });
      }
    };

    this.peer.ontrack = (event) => {
      const remoteVideo = document.createElement('video');
      remoteVideo.autoplay = true;
      remoteVideo.srcObject = event.streams[0];
      document.getElementById("remoteVideos")?.appendChild(remoteVideo);
    };

    this.localStream?.getTracks().forEach(track => this.peer.addTrack(track, this.localStream!));
  }

  initWebSocket() {
    this.ws.connect(this.roomId, async (msg: any) => {
      await this.handleSignal(msg);
    });
  }

  async startCall() {
    const offer = await this.peer.createOffer();
    await this.peer.setLocalDescription(offer);

    this.ws.send(this.roomId, { type: 'offer', sdp: offer.sdp });

    // Para pruebas sin backend:
    // this.signalBus.next({ type: 'offer', sdp: offer.sdp });
  }

  async handleSignal(msg: any) {
    if (msg.type === 'offer') await this.handleOffer(msg);
    if (msg.type === 'answer') await this.handleAnswer(msg);
    if (msg.type === 'candidate') await this.handleCandidate(msg);
  }

  async handleOffer(msg: any) {
    await this.peer.setRemoteDescription({ type: 'offer', sdp: msg.sdp });

    const answer = await this.peer.createAnswer();
    await this.peer.setLocalDescription(answer);

    this.ws.send(this.roomId, { type: 'answer', sdp: answer.sdp });

    // Para pruebas sin backend:
    // this.signalBus.next({ type: 'answer', sdp: answer.sdp });
  }

  async handleAnswer(msg: any) {
    await this.peer.setRemoteDescription({ type: 'answer', sdp: msg.sdp });
  }

  async handleCandidate(msg: any) {
    try {
      await this.peer.addIceCandidate(msg.candidate);
    } catch (e) {
      console.error("Error ICE:", e);
    }
  }

}
