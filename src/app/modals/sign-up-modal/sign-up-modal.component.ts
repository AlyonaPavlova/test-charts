import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { NgxSmartModalService } from 'ngx-smart-modal';

import { serverUrl } from '../../../environments/environment';

@Component({
  selector: 'app-sign-up-modal',
  templateUrl: './sign-up-modal.component.html',
  styleUrls: ['./sign-up-modal.component.css'],
})
export class SignUpModalComponent implements OnInit {
  name: string;
  password: string;

  signupError = null;

  constructor(
    private httpClient: HttpClient,
    public ngxSmartModalService: NgxSmartModalService,
  ) {}

  ngOnInit() {}

  signup() {
    this.httpClient
      .post(`${serverUrl}/signup`, { name: this.name, password: this.password })
      .subscribe((user: any) => {
        if (user) {
          console.log('Registration success', user);

          this.ngxSmartModalService.getModal('signUpModal').close();
        } else {
          this.signupError = 'Registration error';
        }
      });
  }

  closeModal() {
    this.ngxSmartModalService.getModal('signupModal').close();
  }
}
