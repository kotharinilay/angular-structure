import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { ConfirmPasswordValidator } from 'src/app/core/validators';
import { NonAuthService, UserService } from 'src/app/core/services';

@Component({
  selector: 'app-invited-user',
  templateUrl: './invited-user.component.html',
  styleUrls: ['./invited-user.component.scss']
})
export class InvitedUserComponent implements OnInit {
  id: any;
  invitedUserForm: FormGroup;
  firstname: string;
  lastname: string;
  clientName: string;
  emailId: string;
  initials: string;
  phoneNumber: string;
  constructor(private formBuilder: FormBuilder, private nonAuthService: NonAuthService,
    private router: Router, private snackBar: MatSnackBar,
    private userService: UserService, private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activeRoute.params.subscribe(params => {
      this.id = params.id;
    })
    this.validateUser();
    this.invitedUserForm = this.formBuilder.group({
      firstName: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]+')]),
      initial: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]+')]),
      lastName: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]+')]),
      emailId: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
      password: new FormControl('', [Validators.required, Validators.minLength(8),
      Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8),
      Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')])
    }, {
        validators: ConfirmPasswordValidator.MatchPassword
      });

  }

  navigateToLogin() {
    this.router.navigate(['./login']);
  }

  validateUser() {
    this.nonAuthService.ValidateInviteUser(this.id).subscribe(response => {
      this.snackBar.open('You can set your password here !!', 'Success', {
        duration: 2500,
        verticalPosition: 'top'
      });
      this.firstname = response['Result'].firstName;
      this.lastname = response['Result'].lastName;
      this.emailId = response['Result'].emailAddress;
      this.initials = response['Result'].initial;
      this.phoneNumber = response['Result'].phoneNumber;
       
    }, err => {
      this.snackBar.open('You are already registered !!', '', {
        duration: 2500,
        verticalPosition: 'top'
      });
      this.router.navigate(['./login']);
    })

  }

  editProfile() {
    if (this.invitedUserForm.invalid) {
      return;
    }
    const user = {
      userId: this.id,
      firstName: this.firstname,
      initial: this.initials,
      lastName: this.lastname,
      emailAddress: this.emailId,
      isExpired: false,
      isActive: true,
      isDeleted: false,
      userRoleId: '3',
      phoneNumber: this.phoneNumber
    }
    this.userService.editUserProfile(user).subscribe(response => {
      if (response['StatusCode'] === 200) {
        this.snackBar.open('Congratulations, your verification has been completed successfully!', 'Success', {
          duration: 2500,
          verticalPosition: 'top'
        });
      }
    });
  }

}
