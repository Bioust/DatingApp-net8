import { Component, inject, input, OnInit, output, ViewChild } from '@angular/core';
import { Message } from '../../_models/message';
import { MessageService } from '../../_services/message.service';
import { TimeagoModule } from 'ngx-timeago';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-member-message',
  standalone: true,
  imports: [TimeagoModule, FormsModule],
  templateUrl: './member-message.component.html',
  styleUrl: './member-message.component.scss'
})
export class MemberMessageComponent implements OnInit{

  @ViewChild('messageForm') messageForm?: NgForm;
  private messageService =  inject(MessageService);
  username = input.required<string>();
  // messages: Message[] = [];
  messages = input.required<Message[]>();
  messageContent: string = '';
  updateMessages = output<Message>();

  ngOnInit(): void {
    // this.loadMessages();
  }

  loadMessages() {
    // this.messageService.getMessageThread(this.username()).subscribe({
    //   next: messages => this.messages = messages
    // });
  }

  sendMessage() {
    this.messageService.sendMessage(this.username(), this.messageContent).subscribe({
      next: message => {
        this.updateMessages.emit(message);
        this.messageForm?.reset();
      }
    })
  }

}
