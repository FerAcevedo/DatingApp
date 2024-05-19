import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
model: any = {};
@Output() cancelRegister: EventEmitter<any> = new EventEmitter();
  ngOnInit(): void {
  }

  constructor(private accountService: AccountService) {
  }

  register(){
    this.accountService.register(this.model).subscribe(
      {
        next: () => {
          this.cancel();
        },
        error: err => console.log(err)
      }
    );
  }

  cancel(){
    this.cancelRegister.emit(false);
  }
}
