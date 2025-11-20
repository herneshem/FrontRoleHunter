import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-live',
  templateUrl: './live.html',
  styles: ``
})
export class Live implements OnInit {

  peerA!: RTCPeerConnection;
  peerB!: RTCPeerConnection;
  localStream!: MediaStream;

  constructor() { }

  async ngOnInit() {
    await this.initLocalMedia();
    this.createPeers();
  }

  // Obtener cámara y micrófono
  async initLocalMedia() {
    try {
      this.localStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });

      const localVideo = document.getElementById('localVideo') as HTMLVideoElement;
      if (localVideo) localVideo.srcObject = this.localStream;

      console.log('Local media ready:', this.localStream);
    } catch (err) {
      console.error('Error accediendo a cámara/micrófono:', err);
      alert('Por favor habilita el acceso a cámara y micrófono.');
    }
  }

  // Crear dos peers
  createPeers() {
    this.peerA = new RTCPeerConnection({ iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] });
    this.peerB = new RTCPeerConnection({ iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] });

    // Agregar tracks locales a peerA
    if (this.localStream) {
      this.localStream.getTracks().forEach(track => this.peerA.addTrack(track, this.localStream));
    }

    // ICE candidates
    this.peerA.onicecandidate = event => {
      if (event.candidate) this.peerB.addIceCandidate(event.candidate);
    };
    this.peerB.onicecandidate = event => {
      if (event.candidate) this.peerA.addIceCandidate(event.candidate);
    };

    // Recibir tracks remotos en peerB
    this.peerB.ontrack = event => {
      console.log('PeerB ontrack', event.streams);
      const remoteVideo = document.getElementById('remoteVideo') as HTMLVideoElement;
      if (remoteVideo) remoteVideo.srcObject = event.streams[0];
    };
  }

  // Iniciar llamada local
  async startCall() {
    if (!this.peerA || !this.peerB) return;

    try {
      // Crear oferta en peerA
      const offer = await this.peerA.createOffer();
      await this.peerA.setLocalDescription(offer);

      // peerB recibe oferta y crea respuesta
      await this.peerB.setRemoteDescription(offer);
      const answer = await this.peerB.createAnswer();
      await this.peerB.setLocalDescription(answer);

      // peerA recibe respuesta
      await this.peerA.setRemoteDescription(answer);

      console.log('Llamada local establecida correctamente');
    } catch (err) {
      console.error('Error iniciando llamada local:', err);
    }
  }

}
