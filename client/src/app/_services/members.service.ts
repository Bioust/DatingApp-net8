import { HttpClient, HttpHeaders, HttpParams, HttpRequest, HttpResponse } from '@angular/common/http';
import { inject, Injectable, model, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { Member } from '../_models/member';
import { of, tap } from 'rxjs';
import { Photo } from '../_models/photo';
import { PaginationResult } from '../_models/pagination';
import { UserParams } from '../_models/userparams';
import { AccountService } from './account.service';
// import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  // private accountService = inject(AccountService);
  private http = inject(HttpClient);
  private accountService = inject(AccountService);
  baseUrl= environment.apiUrl;
  // members = signal<Member []>([]);  //Instead of getting members everytime we will store members in this variable once we get them
  paginatedResults = signal<PaginationResult<Member> | null>(null);
  // memberCache = new Map(); //Map helps us to get and set values
  memberCache = new Map<string, PaginationResult<Member>>();
  user = this.accountService.currentUser();
  userParams = signal<UserParams | null>(new UserParams(this.user));
  constructor() { }

  resetUserParams() {
    if (this.user) {
    this.userParams.set(new UserParams(this.user));
  }
  }

  // getMembers() {
  //   const userParams = this.userParams();
  //   if (!userParams) return;
  //   const response = this.memberCache.get(Object.values(userParams).join('_'));
  //   if(response) return this.setPaginatedResponse(response);
  //   let params = this.setPaginationHeaders(userParams.pageNumber,userParams.pageSize);
  //   params = params.append('minAge', userParams.minAge);
  //   params = params.append('maxAge', userParams.maxAge);
  //   params = params.append('gender', userParams.gender);
  //   params = params.append('gender', userParams.orderBy);
  //   // return this.http.get<Member[]>(this.baseUrl + 'users', this.getHttpOptions());
  //   return this.http.get<Member[]>(this.baseUrl + 'users', {observe: 'response', params}).subscribe({
  //     next: response => {
  //       this.setPaginatedResponse(response);
  //       this.memberCache.set(Object.values(userParams).join('_'), response);
  //       }
  //   });
  // }

  getMembers() {
  const userParams = this.userParams();
  if (!userParams) return;

  const cacheKey = Object.values(userParams).join('_');
  const cachedResponse = this.memberCache.get(cacheKey);

  if (cachedResponse) {
    this.paginatedResults.set(cachedResponse);
    return;
  }

  let params = this.setPaginationHeaders(userParams.pageNumber, userParams.pageSize);
  params = params.append('minAge', userParams.minAge);
  params = params.append('maxAge', userParams.maxAge);
  params = params.append('gender', userParams.gender);
  params = params.append('orderBy', userParams.orderBy); // 🔧 Fix: was appending gender again

  this.http.get<Member[]>(this.baseUrl + 'users', { observe: 'response', params })
    .subscribe({
      next: response => {
        const pagination = response.headers.get('pagination');
        if (pagination) {
          const paginatedResult: PaginationResult<Member> = {
            items: response.body ?? [],
            pagination: JSON.parse(pagination)
          };
          this.paginatedResults.set(paginatedResult);
          this.memberCache.set(cacheKey, paginatedResult); // ✅ Cache clean data
        }
      }
    });
}

  private setPaginatedResponse(response: HttpResponse<Member[]>) {
    this.paginatedResults.set({
        items: response.body as Member[],
        pagination: JSON.parse(response.headers.get('pagination')!)
        });
  }

  private setPaginationHeaders(pageNumber: number, pageSize: number) {
    let params = new HttpParams();

    if(pageNumber && pageSize) {
      params = params.append('pageNumber', pageNumber);
      params = params.append('pageSize', pageSize);
    }

    return params;
  }

  // getMember(username: string) {
  //   // return this.http.get<Member>(this.baseUrl + 'users/' + username, this.getHttpOptions());
  //   // const member = this.members().find(x => x.userName === username);
  //   // if(member != undefined) return of(member);

  //   const member = [...this.memberCache.values()]
  //   .reduce((arr,elem) => arr.concat(elem.body), [])
  //   .find((m: Member) => m.userName === username);

  //   if(member) return of(member);
  //   return this.http.get<Member>(this.baseUrl + 'users/' + username);
  // }

  getMember(username: string) {
  const allMembers = [...this.memberCache.values()]
    .reduce((arr: Member[], paginated) => arr.concat(paginated?.items ?? []), []); // ✅ type explicitly set

  const member = allMembers.find(m => m.userName === username);

  if (member) return of(member);
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
      // tap(() => {
      //   this.members.update( members => members.map(m=>m.userName == member.userName ? member : m));
      // })
    );
  }
  setMainPhoto(photo: Photo) {
    return this.http.put(this.baseUrl + 'users/set-main-photo/' + photo.id, {}).pipe(
      // tap(() => {
      //   this.members.update(memmbers => memmbers.map(m=> {
      //     if(m.photos.includes(photo)) {
      //       m.photoUrl = photo.url;
      //     }
      //     return m;
      //   }))
      // })
    ); //Empty Body
  }

  deletePhoto(photo: Photo) {
    return this.http.delete(this.baseUrl + 'users/delete-photo/' + photo.id).pipe(
    //   tap(() => {
    //     this.members.update(memmbers => memmbers.map(m=> {
    //       if(m.photos.includes(photo)) {
    //         m.photos = m.photos.filter(p=>p.id !== photo.id);
    //       }
    //       return m;
    //   }))
    // })
    );
  }
}
