import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { faEyeSlash, faEye } from '@fortawesome/free-regular-svg-icons';
import ValidateForm from 'src/app/helpers/validateform';

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
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

    onSubmit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
    } else {
      ValidateForm.validateAllFormFields(this.loginForm);
    }
  }
}
