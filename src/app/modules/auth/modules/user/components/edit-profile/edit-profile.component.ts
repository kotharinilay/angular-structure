import { Component, OnInit, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { ChangePasswordModel } from 'src/app/models';
import { ConfirmPasswordValidator } from 'src/app/core/validators';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  showText: boolean;
  public imagePath: any;
  showImage: boolean;
  imgURL: any;
  public message: string;
  editProfileForm: FormGroup;
  changePasswordForm: FormGroup;
  userRoleId = localStorage.getItem('userRoleId');
  firstname = localStorage.getItem('firstName');
  lastname = localStorage.getItem('lastName');
  clientName = localStorage.getItem('clientName');
  emailId = localStorage.getItem('emailAddress');
  phoneNumber = localStorage.getItem('phoneNumber');
  @ViewChild('avatarInput', { static: true }) avatarInput: ElementRef;
  constructor(private formBuilder: FormBuilder, private userMgmtService: UserService,
    private router: Router, public matDialog: MatDialog,  private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.showText = false;
    this.showImage = true;
    this.editProfileForm = this.formBuilder.group({
      firstName: new FormControl('', [Validators.pattern('[a-zA-Z ]+')]),
      lastName: new FormControl('', [Validators.pattern('[a-zA-Z ]+')]),
      emailAddress: [{ value: '', disabled: true }, Validators.required],
      companyName: new FormControl('', [Validators.pattern('[a-zA-Z ]+')]),
      phoneNumber: new FormControl('')
    });

    this.changePasswordForm = this.formBuilder.group({
      oldPassword: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(8),
                   Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8),
                   Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')])
    }, {
      validators: ConfirmPasswordValidator.MatchPassword
    })
  }

  navigateToUserMgmt() {
    this.router.navigate(['./list']);
  }

  navigateToLogin() {
    this.router.navigate(['./login']);
  }

  showPasswordToggle() {
    this.showText = !this.showText;
  }

  changePasswordDialog(templateRef: TemplateRef<any>) {
    this.matDialog.open(templateRef);
  }

  editProfile() {
    if (this.editProfileForm.invalid) {
      return;
    }
    const user = {
      userId: localStorage.getItem('userId'),
      firstName: this.firstname,
      initial: localStorage.getItem('initial'),
      lastName: this.lastname,
      emailAddress: this.emailId,
      clientName: this.clientName,
      isExpired: false,
      isActive: true,
      isDeleted: false,
      userRoleId: localStorage.getItem('userRoleId'),
      phoneNumber: this.phoneNumber
    }

    this.userMgmtService.editUserProfile(user).subscribe(response => {
      if (response['StatusCode'] === 200) {
        this.snackBar.open('Profile has been updated Successfully !!', 'Success', {
          duration: 2500,
          verticalPosition: 'top'
        });
        
      }
    });
  }

  onFileChange() {
    const userId = localStorage.getItem('userId');
    if (this.avatarInput.nativeElement.files.length > 0) {
      const file = this.avatarInput.nativeElement.files[0];
      if (this.validateFile(file)) {
        let input = new FormData();
        input.append(file.name, file);
        this.userMgmtService.changeAvatar(input,  userId).subscribe(_response => {          
            this.snackBar.open('Avatar updated successfully!', 'Success', {
              duration: 2500,
              verticalPosition: 'top'
            });
            this.avatarInput.nativeElement.value = '';
          });
        }
    }
  }

  validateFile(file: any) {
    const extension = file.name.split('.').pop().toUpperCase();
    if (!['PNG', 'JPG', 'GIF', 'JPEG'].includes(extension)) {
      this.snackBar.open('Invalid file!', 'Error', {
        duration: 2500,
        verticalPosition: 'top'
      });
      return false;
    }
    if (file.size > 15000000) { // 15mb
      this.snackBar.open('File size too large!', 'Error', {
        duration: 2500,
        verticalPosition: 'top'
      });
      return false;
    }
    return true;
  }

  preview(files) {
    if (files.length === 0)
      return;
 
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
 
    var reader = new FileReader();
    this.imagePath = files;
    console.log(this.imagePath);
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this.showImage = true;
      this.imgURL = reader.result; 
    }
  }

  changePassword() {
    if (this.changePasswordForm.invalid) {
      return;
    }
    const user: ChangePasswordModel = {
    userId: localStorage.getItem('userId'),
    oldPassword: this.changePasswordForm.value.oldPassword,
    password: this.changePasswordForm.value.password,
    isChangepassword: true
    }
   
    this.userMgmtService.changePassword(user).subscribe(response => {
      if (response['StatusCode'] === 200) {
        this.snackBar.open('Password has been changed Successfully !!', 'Success', {
          duration: 2500,
          verticalPosition: 'top'
        });
        this.matDialog.closeAll();
      }
    })

  }

}
