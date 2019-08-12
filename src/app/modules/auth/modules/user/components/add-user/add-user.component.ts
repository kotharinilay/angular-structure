import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  
  adduserForm : FormGroup;
  constructor(private formBuilder: FormBuilder, private userMgmtService: UserService,
    private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.adduserForm = this.formBuilder.group({
      firstName : new FormControl('',[Validators.required, Validators.pattern('[a-zA-Z ]+')]),
      lastName : new FormControl('',[Validators.required, Validators.pattern('[a-zA-Z ]+')]),
      emailAddress : new FormControl('',[Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
      initial : new FormControl('',[Validators.required, Validators.pattern('[a-zA-Z ]+')])
    });
  }

  navigateToUserMgmt() {
    this.router.navigate(['./list']);
  }

  createUser() {

    if(this.adduserForm.invalid) {
      return;
    }

    const userModel = {
      userId: '0',
      clientId: localStorage.getItem('clientId'),
      firstName: this.adduserForm.value.firstName,
      initial : this.adduserForm.value.initial,
      lastName: this.adduserForm.value.lastName,
      emailAddress: this.adduserForm.value.emailAddress,
      isExpired: false,
      isActive:  true,
      isDeleted: false,
      userRoleId: 3,
      password: null,
      phoneNumber: null
    }

    this.userMgmtService.addUsers(userModel).subscribe(response => {
      if(response['StatusCode'] === 200) {
         this.snackBar.open('User has been created !!', 'Success', {
          duration: 2500,
          verticalPosition: 'top'
        });
         this.router.navigate(['./list']);
      }
      this.adduserForm.reset();
    })

  }

}
