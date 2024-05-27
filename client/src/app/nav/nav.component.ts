import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AccountService } from '../_services/account.service';
import { Observable, of } from 'rxjs';
import { User } from '../_models/user';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule, RouterModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit{

  model: any = {};

  constructor(public accountService: AccountService, private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    
  }

  login() {
    this.accountService.login(this.model).subscribe({
        next: () => {
          this.router.navigateByUrl('/members');
        }
      }
    ); 
  }
  
  logout(){
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }
}
