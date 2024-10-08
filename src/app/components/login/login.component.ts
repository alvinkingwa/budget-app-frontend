import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router,NavigationEnd,NavigationStart } from '@angular/router';
import { faEyeSlash, faEye } from '@fortawesome/free-regular-svg-icons';
import ValidateForm from 'src/app/helpers/validateform';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  faEye = faEye;
  slashEye = faEyeSlash;
  type: string = 'password';
  public loginForm!: FormGroup;
  loginMessage: string | null = null;
  loginErrorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });


  }
  
  forgotPassword() {
    this.router.navigate(['forgot-password']);
  }
  navigate() {
    this.router.navigate(['signup']);
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const loginObj = {
        email: this.loginForm.get('email')?.value,
        password: this.loginForm.get('password')?.value,
      };

      this.auth.signIn(loginObj).subscribe({
        next: (res) => {
          console.log('Login response:', res); // Log the response
          this.loginForm.reset();
          this.loginErrorMessage = null;
          this.router.navigate(['dashboard']);

          if (res && res.access_token) {
            localStorage.setItem('access_token', res.access_token);
            this.loginMessage = res.message;
          } else {
            this.loginMessage = 'User logged in successfully';
          }
          setTimeout(() => {
            this.loginMessage = null;
          }, 5000);
        },
        error: (err) => {
          console.log('Login error:', err);

          if (err.status === 401) {
            this.loginErrorMessage = 'wrong_password';
          } else {
            this.loginErrorMessage = 'server_down';
          }

          setTimeout(() => {
            this.loginErrorMessage = null;
          }, 5000);
        },
      });
    } else {
      ValidateForm.validateAllFormFields(this.loginForm);
    }
  }
}
