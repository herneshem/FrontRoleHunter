import { Injectable } from '@angular/core';
import { Client } from '@stomp/stompjs';
// import * as SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root'
})
export class WsService {

  client!: Client;

   connect(roomId: string, onMessage: (msg: any) => void) {
    this.client = new Client({
      brokerURL: 'ws://localhost:8080/ws'
    });

    this.client.onConnect = () => {
      this.client.subscribe(`/topic/signal/${roomId}`, m => {
        onMessage(JSON.parse(m.body));
      });
    };

    this.client.activate();
  }

  send(roomId: string, data: any) {
    this.client.publish({
      destination: `/app/signal/${roomId}`,
      body: JSON.stringify(data)
    });
  }
  
}
