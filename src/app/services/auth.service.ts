import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl: string = 'http://localhost:3001/api/';
  private userPayload: any;

  constructor(private http: HttpClient, private router: Router) {
    this.userPayload = this.decodedToken();
  }

  signUp(userObj: any) {
    const endpoint = 'user/signup';
    return this.http.post<any>(`${this.baseUrl}${endpoint}`, userObj);
  }

  signIn(loginObj: any) {
    const endpoint = 'user/login';
    return this.http.post<any>(`${this.baseUrl}${endpoint}`, loginObj);
  }

  deposit(amount: number):Observable<any> {
    const endpoint = 'account/deposit';

    const token = this.getToken();

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const depositAmount = { amount };

    return this.http.patch<any>(`${this.baseUrl}${endpoint}`,depositAmount,{
      headers,
    });
  }

  // storeToken(tokenValue: string) {
  //   localStorage.setItem('token', tokenValue);
  //   console.log(tokenValue);
  // }
  getToken() {
    return localStorage.getItem('access_token');
  }
  isLoggedIn(): boolean {
    return !!localStorage.getItem('access_token');
  }
  signOut() {
    localStorage.clear();
    this.router.navigate(['login']);
  }

  decodedToken() {
    const jwtHelper = new JwtHelperService();
    const access_token = this.getToken()!;
    console.log(jwtHelper.decodeToken(access_token));
    return jwtHelper.decodeToken(access_token);
  }

  getUserNameFromToken() {
    if (this.userPayload) return this.userPayload.firstName;
  }
}
