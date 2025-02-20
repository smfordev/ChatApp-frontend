import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private baseUrl = 'http://localhost:3000';
  
  constructor(private http: HttpClient) { }

  // authentication(userDetails: User) {
  //   return this.http.post(`${this.baseUrl}/users`, userDetails);
  // }
  
  
  authentication(username: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/users?usename=${username}`);
  }
  
}
