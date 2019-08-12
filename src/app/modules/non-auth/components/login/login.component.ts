import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';

import { NonAuthService, AuthService } from 'src/app/core/services';
import { UserModel } from 'src/app/models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userRoleId: any;
  @ViewChild('secondDialog', { static: true }) secondDialog: TemplateRef<any>;
  loginForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private nonAuthService: NonAuthService,
    private authService: AuthService,
    public matDialog: MatDialog) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      userName: new FormControl('', [Validators.required,
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
      password: new FormControl('', [Validators.required])
    })
  }

  loginUser(form: any) {
    if (this.loginForm.invalid) {
      return;
    }
    this.nonAuthService.loginUser(form.value).subscribe(response => {
      this.authService.setAuhToken(response['Result'].token)
      const user: UserModel = {
        lastName: response['Result']['user'].lastName,
        firstName: response['Result']['user'].firstName,
        clientId: response['Result']['user'].clientId,
        emailAddress: response['Result']['user'].emailAddress,
        initial: response['Result']['user'].initial,
        phoneNumber: response['Result']['user'].phoneNumber,
        userId: response['Result']['user'].userId,
        userRoleId: response['Result']['user'].userRoleId,
        isActive: true,
        isDeleted: false,
        isExpired: false,
        password: ''
      }
      this.authService.setUserInfoAuth(user);
      localStorage.setItem('clientName', response['Result']['user'].clientName);
      this.router.navigate(['./']);
    });
  }

  openDialogWithoutRef() {
    this.matDialog.open(this.secondDialog);
  }

  clearLocalStorage() {
    this.authService.logout();
    this.router.navigate(['./login']);
  }
}
