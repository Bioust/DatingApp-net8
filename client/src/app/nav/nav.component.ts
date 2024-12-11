import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [FormsModule, BsDropdownModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {
  accountService = inject(AccountService);
  model : any = {};

  login() {
    //Services return an observable which are lazy and cannot be utilized unless subscribed to it
    this.accountService.login(this.model).subscribe({
      next : response => {
        console.log(response);
      },
      error : error => console.log(error)
    })
    console.log(this.model);
  }

  logout() {
    this.accountService.logout();
  }

  // Observables___New standard for managing async data in  ES7. Lazy collection of multiple values over time

}
