import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AccountService } from '../_services/account.service';
import { Observable, of } from 'rxjs';
import { User } from '../_models/user';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit{

  model: any = {};
  username = '';

  constructor(public accountService: AccountService) { }

  ngOnInit(): void {
    
  }

  login() {
    this.accountService.login(this.model).subscribe({
        next: response => {
          console.log(response);
          this.username = this.model.username;
        },
        error: err => console.log(err)
      }
    ); 
  }
  
  logout(){
    this.accountService.logout();
    this.username = '';
  }
}
