import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl:string = 'http://localhost:3001/api/';
  
  constructor(private http:HttpClient) { }

  signUp(userObj:any){
    const endpoint = 'user/signup'
    return this.http.post<any>(`${this.baseUrl}${endpoint}`,userObj)
  }

  signIn(loginObj:any){
return this.http.post<any>(`${this.baseUrl}login`,loginObj)    
  }
}
