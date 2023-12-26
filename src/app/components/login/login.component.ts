import { Component, } from '@angular/core';
import { FormBuilder, Validators, } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {}

  loginForm = this.fb.group({
    username: ['', Validators.required],
  });

  get username() {
    return this.loginForm.controls['username'];
  }

  ngOnInit(){
    const username = sessionStorage.getItem('username');

    if (username) {
      // If username exists, navigate to the chat page
      this.router.navigate(['/chat']);
    } else {
      // If username doesn't exist, navigate to the login page
      this.router.navigate(['/']);
    }
  }

  authentication() {
    const username = this.loginForm.value.username;
    if(username){
      sessionStorage.setItem('username', username.trim() as string);
      this.router.navigate(['/chat']);
    }
  }
}
