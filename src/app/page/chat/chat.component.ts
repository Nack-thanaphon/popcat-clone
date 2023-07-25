// src/app/chat/chat.component.ts
import { Component } from '@angular/core';
import { SocketService } from 'src/app/service/socket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  user!: string;
  message!: string;
  messages: any[] = [];

  constructor(private socketService: SocketService) {
    this.socketService.onMessageReceived().addEventListener('message', (event: MessageEvent) => {
      const data = JSON.parse(event.data);
      this.messages.push(data);
    });
  }

  sendMessage() {
    this.socketService.sendMessage(this.user, this.message);
    this.message = '';
  }
}
