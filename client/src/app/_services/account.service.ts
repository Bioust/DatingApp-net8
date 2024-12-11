import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { map } from 'rxjs';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private http = inject(HttpClient);
  baseUrl = 'https://localhost:5001/api/';
  currentUser = signal<User | null>(null);

  constructor() { }

  //Singleton
  // It's created when application starts
  //It's useful for creating states and making http requests

  login(model:any) {
    return this.http.post<User>(this.baseUrl + 'account/login',model).pipe(
      map(user => {
        if(user) {
          localStorage.setItem('user',JSON.stringify(user));
          this.currentUser.set(user);
        }
        return user;
      })
    );
  }

  register(model:any) {
    return this.http.post<User>(this.baseUrl + 'account/register',model).pipe(
      map(user => {
        if(user) {
          localStorage.setItem('user',JSON.stringify(user));
          this.currentUser.set(user);
        }
        return user;
      })
    );
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUser.set(null);
  }
}
