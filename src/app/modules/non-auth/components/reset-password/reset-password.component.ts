import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/core/services';
import { ConfirmPasswordValidator } from 'src/app/core/validators';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
   Id: any;
   showText: boolean;
   resetPasswordForm: FormGroup;
  constructor(private activeRoute: ActivatedRoute, private router: Router, 
    private formBuilder: FormBuilder, private snackBar: MatSnackBar, 
    private userService: UserService) { }

  ngOnInit() {
    this.showText = false;
    this.activeRoute.params.subscribe(params => {
      this.Id = params.id;
    })
    this.resetPasswordForm = this.formBuilder.group({
      password: new FormControl('', [Validators.required, Validators.minLength(8),
                   Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8),
                   Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')])
    }, {
      validators: ConfirmPasswordValidator.MatchPassword
    })
  }

  showPasswordToggle() {
    this.showText = !this.showText;
  }

  changePassword() {
    if (this.resetPasswordForm.invalid) {
      return;
    }
    const user = {
    userId: this.Id,
    password: this.resetPasswordForm.value.password,
    isChangepassword: false
    }
   
    this.userService.resetPassword(user).subscribe(response => {
      if (response['StatusCode'] === 200) {
        this.snackBar.open('Password has been changed Successfully !!', 'Success', {
          duration: 2500,
          verticalPosition: 'top'
        });
        this.router.navigate(['./login']);
      }
    })

  }

}
