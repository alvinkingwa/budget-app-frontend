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
  private baseURLdaily: string = 'http://localhost:3001/api';
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

  deposit(receiverName: string, amount: number): Observable<any> {
    const endpoint = 'account/deposit';
    const depositAmount = { receiverName, amount };
    console.log(
     " receiverName",receiverName,
     "amount",amount,
      "money deposited successful")
  
    return this.http.patch<any>(`${this.baseUrl}${endpoint}`, depositAmount);
  }
  createCategory(categoryData: any): Observable<any> {
    const endpoint = 'categories/create';
    return this.http.post<any>(`${this.baseUrl}${endpoint}`, categoryData);
  }

  spendOnCategory(categoryId: string, amount: number ,receiverName:string): Observable<any> {
    const endpoint = `categories/${categoryId}/spend`;
    const requestBody = { amount ,receiverName};
    return this.http.patch<any>(`${this.baseUrl}${endpoint}`, requestBody);
  }

  setAmountLimit(categoryId: string, limitAmount: number): Observable<any> {
    const endpoint = `amountLimit/${categoryId}/create`;
    const requestBody = { limitAmount };
    return this.http.post<any>(`${this.baseUrl}${endpoint}`, requestBody);
  }

 updateCategoryLimit(categoryId: string, limitAmount: number): Observable<any> {
    const endpoint = `amountLimit/${categoryId}/update`;
    const requestBody = { limitAmount };
    return this.http.patch<any>(`${this.baseUrl}${endpoint}`, requestBody);
  }

  editCategorySpending( 
    categoryId: string,
    amount: number,
    receiverName: string
  ): Observable<any> {
    const endpoint = `categories/${categoryId}/spend`;
    const requestBody = { amount, receiverName };

    return this.http.patch<any>(`${this.baseUrl}${endpoint}`, requestBody);
  }

  getTransaction(userId: string): Observable<any[]> {
    const endpoint = `account/all-transaction/${userId}`;
    return this.http.get<any[]>(`${this.baseUrl}${endpoint}`);
  }

  getUserBalance(userId: string): Observable<any> {
    const endpoint = `user/${userId}`;
    return this.http.get<any>(`${this.baseUrl}${endpoint}`);
  }

  getDailyExpenseTotal(userId: string, date: string): Observable<any> {
    const endpoint = `user/${userId}/daily-expense-total?date=${date}`;
    return this.http.get<any>(`${this.baseURLdaily}/${endpoint}`);
  }

  getTotalAmountLimit(userId: string): Observable<any> {
    const endpoint = `amountLimit/${userId}/total/monthly`;
    return this.http.get<any>(`${this.baseUrl}${endpoint}`);
  }
  

  categoryWithNoSpend(): Observable<any[]> {
    const noSpentCategoryEndpoint = 'categories/without-amount-spent';
    return this.http.get<any[]>(`${this.baseUrl}${noSpentCategoryEndpoint}`);
  }
 

amountLimit(categoryId: string, limitAmount: number): Observable<any> {
    const endpoint = `amountLimit/${categoryId}/create`;
    const requestBody = {limitAmount};
    return this.http.post<any>(`${this.baseUrl}${endpoint}`, requestBody);
  }

  deleteCategory(categoryId: string): Observable<void> {
    const endpoint = `categories/${categoryId}/delete`;
    return this.http.delete<void>(`${this.baseUrl}${endpoint}`);
  }
  // createCategory(category: any): Observable<any> {
  //   const endpoint = 'categories/create';
  //   return this.http.post<any>(`${this.baseUrl}${endpoint}`, category);
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
  getUserIdFromToken() {
    if (this.userPayload) return this.userPayload.userId;
  }
}
