import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { UserDataService } from './user-data.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl: string = 'http://localhost:3001/api/';
  private userPayload: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private userDataService: UserDataService
  ) {
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

  deposit(amount: number): void {
    const endpoint = 'account/deposit';
    const depositAmount = { amount };

    this.http
      .patch<any>(`${this.baseUrl}${endpoint}`, depositAmount)
      .subscribe({
        next: (response) => {
          this.userDataService.setUserBalance(response.account.balance);
        },
        error: (error) => console.log(error),
        complete: () => console.log('complete'),
      });
  }
  getUserBalance(userId: string): Observable<any> {
    const endpoint = `user/${userId}`;
    return this.http.get<any>(`${this.baseUrl}${endpoint}`);
  }
  // categoryTransaction(userId: string): Observable<any> {
  //   const categoryEndpoint = `account/all-transaction/${userId}`;
  //   return this.http.get<any>(`${this.baseUrl}${categoryEndpoint}`);
  // }
  categoryWithNoSpend():Observable<any[]> {
    const noSpentCategoryEndpoint= "categories/without-amount-spent";
    return this.http.get<any[]>(`${this.baseUrl}${noSpentCategoryEndpoint}`)
  }

  deleteCategory(categoryId:string):Observable<void>{
    const endpoint = `categories/${categoryId}/delete`;
    return this.http.delete<void>(`${this.baseUrl}${endpoint}`);
  }
createCategory(category:any):Observable<any>{
  const endpoint = 'categories/create';
  return this.http.post<any>(`${this.baseUrl}${endpoint}`,category)
  
}

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
  getUserIdFromToken() {
    if (this.userPayload) return this.userPayload.userId;
  }
}
