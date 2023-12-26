import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Message } from 'src/app/interfaces/message';
import { ChatService } from 'src/app/services/chat.service';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  
  messages: Message[] = [];

  message = '';

  typingUsers: string[] = [];
  connectedUsers: string[] = [];

  @ViewChild('scrollMe') private myScrollContainer!: ElementRef;

  constructor(
    private socketService: SocketService
  ) {}

  ngOnInit(): void {
    this.socketService.emitEvent(
      'setUsername',
      sessionStorage.getItem('username')
    );

    this.socketService.onEvent('message', (msg) => {
      this.messages.push({ sender: msg.user, content: msg.text });
      this.scrollToBottom();
    });

    this.socketService.onEvent('chatHistory', (msgs) => {
      msgs.forEach((msg: { user: string; text: string }) => {
        this.messages.push({ sender: msg.user, content: msg.text });
      });
    });

    this.socketService.onEvent('updateUserList', (onlineUsers) => {
      this.connectedUsers = [];
      onlineUsers.forEach((username: string) => {
        this.connectedUsers.push(username);
      });
    })

    this.socketService.onEvent('updateTypingList', (typingList) => {
      this.typingUsers = [];
      typingList.forEach((username: string) => {
        this.typingUsers.push(username);
      });
    });

    this.socketService.onEvent('userJoined', (username) => {
        this.messages.push({ sender: username, content: ' joined the chat.' });
    });
    this.socketService.onEvent('userLeft', (username) => {
      this.messages.push({ sender: username, content: ' left the chat.' });
  });
  }

  onBlurEvent() {
    this.socketService.emitEvent('stoppedTyping');
  }

  onFocusEvent() {
    this.socketService.emitEvent('isTyping');
  }

  submit() {
    if(this.message.trim()!==''){
      this.socketService.emitEvent('message', this.message);
      this.message = '';
    }
  }

  get getUsername(): string | null {
    return sessionStorage.getItem('username');
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop =
        this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }

  adjustTextArea(event: any): void {
    const textArea: HTMLTextAreaElement = event.target;
    textArea.style.height = '15px'; // Reset the height
    const scrollHeight = textArea.scrollHeight;

    if (scrollHeight > 28) {
      // Use max-height here
      textArea.style.height = '28px';
      textArea.style.overflowY = 'auto';
    } else {
      textArea.style.overflowY = 'hidden';
    }
  }
  
}
