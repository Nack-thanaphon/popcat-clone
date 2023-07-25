// src/app/socket.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: WebSocket;
  private readonly baseUrl: string = 'ws://localhost:5000'; // Replace with your backend WebSocket URL

  constructor() {
    this.socket = new WebSocket(this.baseUrl);

    this.socket.onopen = () => {
      console.log('WebSocket connection opened.');
    };

    this.socket.onclose = (event) => {
      console.log('WebSocket connection closed:', event);
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  }

  sendMessage(user: string, message: string) {
    const data = {
      user,
      message
    };
    this.socket.send(JSON.stringify(data));
  }

  onMessageReceived(): WebSocket {
    return this.socket;
  }
}
