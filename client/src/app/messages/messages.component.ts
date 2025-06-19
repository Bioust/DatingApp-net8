import { Component, inject, OnInit } from '@angular/core';
import { MessageService } from '../_services/message.service';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { FormsModule } from '@angular/forms';
import { TimeagoModule } from 'ngx-timeago';
import { Message } from '../_models/message';
import { RouterLink } from '@angular/router';
import { PaginationModule } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [ButtonsModule, FormsModule, TimeagoModule, RouterLink, PaginationModule],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss'
})
export class MessagesComponent implements OnInit {

  messageService = inject(MessageService);
  container = 'Unread';
  PageNumber=1;
  PageSize=5;
  isOutbox = this.container = 'Outbox';

    ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages() {
    this.messageService.getMessages(this.PageNumber,this.PageSize,this.container);
  }

  deleteMessage(id: number) {
    this.messageService.deleteMessage(id).subscribe({
      next: () => {
        this.messageService.paginatedResult.update(prev => {
          if (prev && prev.items) {
  const index = prev.items.findIndex(m => m.id == id);
  if (index !== -1) {
    prev.items.splice(index, 1); // removes the item at index
  }
  return prev;
}

          return prev;
        })
      }
    });
  }

  getRoute(message : Message) {
    if(this.container === 'Outbox') return `/members/${message.recipientUsername}`;
    else return `/members/${message.senderUsername}`;
  }

  pageChanged(event: any) {
    if(this.PageNumber != event.page) {
      this.PageNumber = event.page;
      this.loadMessages();
    }
  }

}
