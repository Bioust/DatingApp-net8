import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { map } from 'rxjs';
import { User } from '../_models/user';
import { environment } from '../../environments/environment';
import { LikesService } from './likes.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private http = inject(HttpClient);
  private likeService = inject(LikesService);
  // baseUrl = 'https://localhost:5001/api/';
    baseUrl= environment.apiUrl;
  currentUser = signal<User | null>(null);

  constructor() { }

  //Singleton
  // It's created when application starts
  //It's useful for creating states and making http requests

  login(model:any) {
    return this.http.post<User>(this.baseUrl + 'account/login',model).pipe(
      map(user => {
        if(user) {
          // localStorage.setItem('user',JSON.stringify(user));
          // this.currentUser.set(user);
          this.setCurrentUser(user);
        }
        return user;
      })
    );
  }

  register(model:any) {
    return this.http.post<User>(this.baseUrl + 'account/register',model).pipe(
      map(user => {
        if(user) {
          this.setCurrentUser(user);
        }
        return user;
      })
    );
  }

  setCurrentUser(user: User) {
          localStorage.setItem('user',JSON.stringify(user));
          this.currentUser.set(user);
          this.likeService.getLikeIds();

  }

  logout() {
    localStorage.removeItem('user');
    this.currentUser.set(null);
  }
}
