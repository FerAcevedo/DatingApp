import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from "./nav/nav.component";
import { User } from './_models/user';
import { AccountService } from './_services/account.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { TestErrorComponent } from './errors/test-error/test-error.component';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, HttpClientModule, CommonModule, TestErrorComponent, NavComponent, HomeComponent, RegisterComponent]
})
export class AppComponent implements OnInit{
  title = 'Dating App';
  users: any;
  http = inject(HttpClient);

  constructor(private services: AccountService) {    
  }

  ngOnInit(): void {
    this.setCurrentUser(); 
  }


  setCurrentUser(){
    const userString = localStorage.getItem('user');

    if(!userString) return;
    const user: User = JSON.parse(userString);
    this.services.setCurrentUser(user);
  }
}

