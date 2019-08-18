import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { NgxSmartModalService } from 'ngx-smart-modal';

import { serverUrl } from '../../../environments/environment';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css'],
})
export class LoginModalComponent implements OnInit {
  name: string;
  password: string;

  @Output() loggedEvent = new EventEmitter<boolean>();

  loginError = null;

  constructor(
    private httpClient: HttpClient,
    public ngxSmartModalService: NgxSmartModalService,
  ) {}

  ngOnInit() {}

  login() {
    this.httpClient
      .post(`${serverUrl}/login`, { name: this.name, password: this.password })
      .subscribe((res: boolean) => {
        if (res) {
          this.loggedEvent.emit(true);

          this.ngxSmartModalService.getModal('loginModal').close();
        } else {
          this.loginError = 'Incorrect name or password';
        }
      });
  }

  closeModal() {
    this.ngxSmartModalService.getModal('loginModal').close();
  }
}
