import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { LikesService } from '../_services/likes.service';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { FormsModule } from '@angular/forms';
import { MemberCardComponent } from '../members/member-card/member-card.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-lists',
  standalone: true,
  imports: [ButtonsModule, FormsModule, MemberCardComponent, PaginationModule],
  templateUrl: './lists.component.html',
  styleUrl: './lists.component.scss'
})
export class ListsComponent implements OnInit, OnDestroy{

  likeService = inject(LikesService);
  predicate = 'liked';
  PageNumber=1;
  PageSize=5;



  ngOnInit(): void {
    this.loadLikes();
  }

  getTitle() {
    switch (this.predicate){
      case 'liked': return 'Members you like';
      case 'likedBy': return 'Members who likes you';
      default: return 'Mutual';
    }
  }

  loadLikes() {
    this.likeService.getLikes(this.predicate, this.PageNumber, this.PageSize);
  }

  pageChanged(event: any) {
    if(this.PageNumber != event.page) {
      this.PageNumber = event.page;
      this.loadLikes();
    }
  }

  ngOnDestroy(): void {
    this.likeService.paginatedResult.set(null);
  }


}
