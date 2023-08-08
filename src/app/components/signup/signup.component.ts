import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient){}

  ngOnInit(){
        this.signupForm = this.formBuilder.group({
          firstName:['',Validators.required ],
          lastName:['',Validators.required],
          email:['',Validators.required],
          password:['',Validators.required]
        });
      }
      onsubmit(){
        if(this.signupForm.valid){
          const data = {
            firsName:this.signupForm.get('firstName')?.value,
            lastName:this.signupForm.get('lastName')?.value,
            email:this.signupForm.get('email')?.value,
            password:this.signupForm.get('password')?.value
          };
          this.http.post('/api/v1/users',data).subscribe(
            (res:any) =>{
              console.log(res);
              this.alert('signup successful!')   
            },
            (err:any)=>{
              console.log(err);
              this.alert('signup failed')
            }
          )
        }
      }
      alert(message:String){
        const Toast = this.alertController.create({
          message:MessageChannel,
          duration:3000
        })
        Toast.present();
      }
  }

