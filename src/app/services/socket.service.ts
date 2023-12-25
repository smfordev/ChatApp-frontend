import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket!: Socket;
  private url = 'http://localhost:3000'; // Your Socket.IO server URL

  constructor() {
    this.connect();
  }

  connect(): void {
    this.socket = io(this.url);
  }

  onEvent(event: string, callback: (...args: any[]) => void): void {
    this.socket.on(event, callback);
  }

  emitEvent(event: string, data?: any): void {
    this.socket.emit(event, data);
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}
