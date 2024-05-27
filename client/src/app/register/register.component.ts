import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
model: any = {};
@Output() cancelRegister: EventEmitter<any> = new EventEmitter();
  ngOnInit(): void {
  }

  constructor(private accountService: AccountService, private toastr: ToastrService) {
  }

  register(){
    this.accountService.register(this.model).subscribe(
      {
        next: () => {
          this.cancel();
        },
        error: err => this.toastr.error(err.error)
      }
    );
  }

  cancel(){
    this.cancelRegister.emit(false);
  }
}
