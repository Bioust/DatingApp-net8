import { Component, inject, OnInit } from '@angular/core';
import { RegisterComponent } from "../register/register.component";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RegisterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  http = inject(HttpClient);
  registerMode : boolean = false;
  users: any = [];


  ngOnInit(): void {
    // this.getUsers();
  }

  registerToggle() {
    this.registerMode = !this.registerMode;
  }

  getUsers() {
    this.http.get('https://localhost:5001/api/users').subscribe({
      next: (response) => {
        this.users = response;
      },
      error : (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('Request has Completed');
      }
    });
  }

  cancelRegisterMode(event: boolean) : void {
    this.registerMode = event;
  }
}
