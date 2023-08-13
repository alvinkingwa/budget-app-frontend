import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {} from '@angular/common/http';
import { faEyeSlash, faEye } from '@fortawesome/free-regular-svg-icons';
import ValidateForm from 'src/app/helpers/validateform';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  faEye = faEye;
  slashEye = faEyeSlash;
  type: string = 'password';
  public signUpForm!: FormGroup;
  signupMessage: string | null = null;
  signupErrorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      firstName: ['', Validators.required],
      secondName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.signUpForm.valid) {
      this.auth.signUp(this.signUpForm.value).subscribe({
        next: (res) => {
          console.log(res);
          this.signUpForm.reset();
          this.signupErrorMessage = null;
          if (res && res.message) {
            this.signupMessage = res.message;
          } else {
            this.signupMessage = 'User signed up successfully';
          }
          setTimeout(() => {
            this.signupMessage = null;
          }, 5000);
        },
        error: (err) => {
          console.error(err);
          this.signupMessage = null;
          this.signupErrorMessage = err.error.message;
          setTimeout(() => {
            this.signupErrorMessage = null;
          }, 5000);
        },
      });
      console.log(this.signUpForm.value);
    } else {
      ValidateForm.validateAllFormFields(this.signUpForm);
    }
  }
}
