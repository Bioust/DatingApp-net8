import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { Member } from '../_models/member';
import { of, tap } from 'rxjs';
// import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  // private accountService = inject(AccountService);
  private http = inject(HttpClient);
  baseUrl= environment.apiUrl;
  members = signal<Member []>([]);  //Instead of getting members everytime we will store members in this variable once we get them

  constructor() { }

  getMembers() {
    // return this.http.get<Member[]>(this.baseUrl + 'users', this.getHttpOptions());
    return this.http.get<Member[]>(this.baseUrl + 'users').subscribe({
      next: members => this.members.set(members)
    });
  }

  getMember(username: string) {
    // return this.http.get<Member>(this.baseUrl + 'users/' + username, this.getHttpOptions());
    const member = this.members().find(x => x.userName === username);
    if(member != undefined) return of(member);
    return this.http.get<Member>(this.baseUrl + 'users/' + username);
  }

  // getHttpOptions() {
  //   return {
  //     headers : new HttpHeaders({
  //       Authorization : `Bearer ${this.accountService.currentUser()?.token}`
  //     })
  //   }
  // }

  updateMember(member: Member) {
    return this.http.put(this.baseUrl + 'users', member).pipe(
      tap(() => {
        this.members.update( members => members.map(m=>m.userName == member.userName ? member : m));
      })
    );
  }
}
