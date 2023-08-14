import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import ValidateForm from 'src/app/helpers/validateform';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent implements OnInit {
  public forgotPasswordForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.forgotPasswordForm = this.fb.group({
      email: ['', Validators.required],
    });
  }
  onSubmit(){
    if(this.forgotPasswordForm.valid){
      const forgotObj = {
        email:this.forgotPasswordForm.get('email')?.value
      }


    }else{
      ValidateForm.validateAllFormFields(this.forgotPasswordForm)
    }
  }
}
