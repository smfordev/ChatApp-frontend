import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Message } from 'src/app/interfaces/message';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit{

  messages: Message[] = [];

  message = '';

  @ViewChild('scrollMe') private myScrollContainer!: ElementRef;

  private baseUrl = 'http://localhost:3000';

  constructor(private chatService: ChatService){}

  ngOnInit(): void {
    this.chatService.getMessages().subscribe({
      next: (res: any) => {
        console.log(res,'response')
        this.messages = res;
      },
      error: (err) => {
        console.log(err,'errors')
      }
    });
    this.scrollToBottom();
  }

  submit() {
    this.chatService.submit(this.message).subscribe({
      next: (res: any) => {
        console.log(res,'response');
        this.messages.push(res);
        this.message = '';
      },
      error: (err) => {
        console.log(err,'errors')
      }
    });
  }


  get getUsername(): string | null {
    return sessionStorage.getItem('username');
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
      try {
          this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
      } catch(err) { }                 
  }


}
