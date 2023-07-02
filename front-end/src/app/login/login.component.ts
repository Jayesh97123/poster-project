import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { error } from 'console';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  showErrorMsg: boolean = false;

  constructor(
    private fb: FormBuilder,
    private service: AppService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  signUp() {
    this.router.navigate(['/signup']);
  }

  signIn() {
    this.service
      .checkLogin(
        this.loginForm.get('email')?.value,
        this.loginForm.get('password')?.value
      )
      .subscribe(
        (res) => {
          console.log(res);
          this.showErrorMsg = false;
          this.router.navigate(['/poster-list', res.email]);
        },
        (error) => {
          console.log(error);
          this.showErrorMsg = true;
          this.loginForm.reset();
        }
      );
  }
}
