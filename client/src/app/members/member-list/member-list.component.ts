import { Component, inject, OnInit } from '@angular/core';
import { MembersService } from '../../_services/members.service';
import { MemberCardComponent } from "../member-card/member-card.component";
import {PaginationModule} from "ngx-bootstrap/pagination";
import { AccountService } from '../../_services/account.service';
import { UserParams } from '../../_models/userparams';
import { FormsModule } from '@angular/forms';
import { ButtonsModule } from "ngx-bootstrap/buttons";

@Component({
  selector: 'app-member-list',
  standalone: true,
  imports: [MemberCardComponent, PaginationModule, FormsModule, ButtonsModule],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.scss'
})
export class MemberListComponent implements OnInit {

  private accountService = inject(AccountService);
  memberService = inject(MembersService);
  // userParams = new UserParams(this.accountService.currentUser());
  genderList = [
    {value : 'male', display: 'Males'},
    {value : 'female', display: 'Females'}
  ];

  userParams!: UserParams;


  ngOnInit(): void {
    const params = this.memberService.userParams();
  if (params) {
    this.userParams = params;
  } else {
    this.userParams = new UserParams(this.memberService.user!); // fallback
  }
    if(!this.memberService.paginatedResults()) this.loadMembers();
  }

  resetFilters() {
    // this.userParams = new UserParams(this.accountService.currentUser());
    this.memberService.resetUserParams();
    this.loadMembers();
  }


  pageChanged(e:any) {
    const userParams = this.memberService.userParams();
      if (userParams && userParams.pageNumber !== e.page) {
    userParams.pageNumber = e.page;
    this.memberService.userParams.set(userParams);  // update the signal
    this.loadMembers();
      }
  }

  loadMembers() {
    this.memberService.getMembers();
    // .subscribe({
    //   next: members => this.members = members,
    //   error: error => console.log(error)
    // })
  }

}
