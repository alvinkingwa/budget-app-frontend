import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
private userBalanceSubject = new BehaviorSubject<number>(0);
userBalance$= this.userBalanceSubject.asObservable();
  constructor() { }
  setUserBalance(balance:number){
    this.userBalanceSubject.next(balance)
  }

  

}
