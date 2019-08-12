import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { NonAuthService } from './../../../../core/services/non-auth.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private nonAuthService: NonAuthService,
    private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.forgotPasswordForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')])
    })
  }

  navigateToLogin() {
    this.router.navigate(['./login']);
  }

  forgotPasswordSubmit(form: any) {
    if (this.forgotPasswordForm.invalid) {
      return;
    }
    if (form.value['email'] !== '' || form.value['email'] !== undefined) {
      this.nonAuthService.ForgotPassword(form.value['email']).subscribe(response => {
        if (response['StatusCode'] === 200) {
          this.snackBar.open('A reset password has been sent on your registered Email ID. Please set your new password.', 'Success', {
            duration: 2500,
            verticalPosition: 'top'
          });
          this.router.navigate(['./login']);
        }
      }
      );

    }


  }

}
