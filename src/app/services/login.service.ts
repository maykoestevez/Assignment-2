import { Injectable } from '@angular/core';
import { User } from '../models/class/user';
import { Observable, Observer } from 'rxjs';
import { USERS } from '../components/shared/mock-users';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private userList: Array<User>;

  constructor() {
    this.userList = USERS;
  }

  public validateUserObservable(email: string, password: string): Observable<boolean> {
    const userObservable = Observable.create((observer: Observer<boolean>) => {
      const valid = this.validateUser(email, password);
      observer.next(valid);
    });
    return userObservable;
  }

  public validateUserPromise(email: string, password: string): Promise<boolean> {
    const userPromise = new Promise<boolean>((resolver) => {
      const valid = this.validateUser(email, password);
      resolver(valid);
    });
    return userPromise;
  }

  private validateUser(email: string, password: string): boolean {
    const valid = this.userList
                      .some(u => u.email === email && u.password === password);
    return valid;
  }

}
