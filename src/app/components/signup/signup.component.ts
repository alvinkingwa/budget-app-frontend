import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {   } from '@angular/common/http';
import { faEyeSlash, faEye } from '@fortawesome/free-regular-svg-icons';
import ValidateForm from 'src/app/helpers/validateform';
import { AuthService } from 'src/app/services/auth.service';

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

  constructor(private fb: FormBuilder, private auth: AuthService) {}

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
          // alert(res.message);
          if (res && res.message){
            alert(res.message)
          }else{
            alert('user signed up successfully')
          }
        },
        error: (err) => {
          alert(err.error.message);
        },
      });
      console.log(this.signUpForm.value);
    } else {
      ValidateForm.validateAllFormFields(this.signUpForm);
    }
  }
}
