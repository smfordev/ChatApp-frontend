import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Message } from '../interfaces/message';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  submit(message: string){
    return this.http.post(`${this.baseUrl}/messages`,{
      sender: sessionStorage.getItem('username'),
      content: message,
    })
  }

  getMessages(): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.baseUrl}/messages`);
  }

}
