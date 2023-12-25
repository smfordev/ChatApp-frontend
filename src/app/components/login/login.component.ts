import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private fb : FormBuilder, private authService: AuthService, private router: Router) {}

  loginForm = this.fb.group({
    username: ['', Validators.required],
  });

  // authentication() {
  //   const user = {
  //     username: this.username,
  //   };
  //   this.authService.authentication(user as User).subscribe({
  //     next: (res: any) => {
  //       console.log(res,'response')
  //     },
  //     error: (err) => {
  //       console.log(err,'errors')
  //     }
  //   });
  // }


  authentication() {

    const username = this.loginForm.value.username;

      this.authService.authentication(username as string).subscribe({
        next: (res: any) => {
          console.log(res,'response')
          sessionStorage.setItem('username', username as string);
          this.router.navigate(['/chat']);
        },
        error: (err) => {
          console.log(err,'errors')
        }
      });
    }

}
