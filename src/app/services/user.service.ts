import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userName$ = new BehaviorSubject<string>('');

  constructor() {}

  public getUserName() {
    return this.userName$.asObservable();
  }
  public setFullName(userName: string) {
    this.userName$.next(userName);
  }
}
