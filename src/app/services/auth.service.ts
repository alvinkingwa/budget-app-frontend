import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl:string = 'http://localhost:3001/api/';
  
  constructor(private http:HttpClient ,private router:Router) { }

  signUp(userObj:any){
    const endpoint = 'user/signup'
    return this.http.post<any>(`${this.baseUrl}${endpoint}`,userObj)
  }

  signIn(loginObj:any){
    const endpoint = 'user/login'
return this.http.post<any>(`${this.baseUrl}${endpoint}`,loginObj)    
  }
  storeToken(tokenValue:string){
    localStorage.setItem('token',tokenValue)
  }
  getToken(){
    return localStorage.getItem('token')
  }
  isLoggedIn():boolean{
    return !!localStorage.getItem('token')
  }
  signOut(){
    localStorage.clear()
    this.router.navigate(['login'])
  }
}
