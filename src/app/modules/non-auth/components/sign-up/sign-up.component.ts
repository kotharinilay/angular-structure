import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NonAuthService } from 'src/app/core/services';
import { ConfirmPasswordValidator } from 'src/app/core/validators';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  userSignUpForm: FormGroup;
  validCaptcha = true;

  @ViewChild('mainCaptcha', {static: true}) public mainCaptcha: ElementRef;
  @ViewChild('txtInput', {static: true}) public txtInput: ElementRef;
  
  constructor(private formBuilder: FormBuilder, private nonAuthService: NonAuthService,
    private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.userSignUpForm = this.formBuilder.group({
      firstName : new FormControl('',[Validators.required, Validators.pattern('[a-zA-Z ]+')]),     
      initial : new FormControl('',[Validators.required, Validators.pattern('[a-zA-Z ]+')]),
      lastName : new FormControl('',[Validators.required, Validators.pattern('[a-zA-Z ]+')]),
      companyName : new FormControl('',[Validators.required, Validators.pattern('[a-zA-Z ]+')]), 
      emailAddress : new FormControl('',[Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
      phoneNumber : new FormControl('',[Validators.required, Validators.pattern(/^((?!(0))[0-9]{15})$/)]),
      captcha : new FormControl('', [Validators.required]),
      password : new FormControl('',[Validators.required, Validators.minLength(8),
                     Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]),
      confirmPassword : new FormControl('',[Validators.required, Validators.minLength(8),
                     Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')])
    } , {
      validators: ConfirmPasswordValidator.MatchPassword
   });

    this.Captcha();
  }

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if(event.keyCode !=8  && !pattern.test(inputChar)) {
       event.preventDefault();
    }
  }

  registerUser () {
    if (this.userSignUpForm.invalid) {
      return false;
    }

    if(!this.ValidCaptcha()) {
      this.snackBar.open('Invalid captcha !!', 'Error', {
       duration: 2500,
       verticalPosition: 'top'
     });
     return false;
   }

    const userModel = {
    clientId : '0',
    name : this.userSignUpForm.value.companyName,
    isDeleted: true,
    expiryDate: new Date(),
    subscriptionStatus: true,
    user: {
      userId: '0',
      clientId: '0',
      firstName: this.userSignUpForm.value.firstName,
      initial : this.userSignUpForm.value.initial,
      lastName: this.userSignUpForm.value.lastName,
      emailAddress: this.userSignUpForm.value.emailAddress,
      password: this.userSignUpForm.value.password,
      isExpired: false,
      isActive: true,
      isDeleted: false,
      userRoleId: 2,
      phoneNumber: this.userSignUpForm.value.phoneNumber
    },
  }
  
  this.nonAuthService.createUser(userModel).subscribe(response => {
       this.snackBar.open('Congratulation, you have been registered successfully, a verification link has been sent on your email kindly verify your email!', 'Success', {
        duration: 2500,
        verticalPosition: 'top'
      });
       this.router.navigate(['./login']);
    this.userSignUpForm.reset();
  })

}

Captcha(){
  var alpha = new Array('A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z');
  var i;
  for (i=0;i<6;i++){
    var a = alpha[Math.floor(Math.random() * alpha.length)];
    var b = alpha[Math.floor(Math.random() * alpha.length)];
    var c = alpha[Math.floor(Math.random() * alpha.length)];
    var d = alpha[Math.floor(Math.random() * alpha.length)];
    var e = alpha[Math.floor(Math.random() * alpha.length)];
    var f = alpha[Math.floor(Math.random() * alpha.length)];
    var g = alpha[Math.floor(Math.random() * alpha.length)];
   }
 var code = a + ' ' + b + ' ' + ' ' + c + ' ' + d + ' ' + e + ' '+ f + ' ' + g;
 this.mainCaptcha.nativeElement.value = code
}

ValidCaptcha(){
  const string1 = this.removeSpaces(this.mainCaptcha.nativeElement.value);
  const string2 = this.removeSpaces(this.txtInput.nativeElement.value);
  if (string1 === string2){
    this.snackBar.open('Captcha is Valid !!', 'Success', {
      duration: 2500,
      verticalPosition: 'top'
    });
    return true;
  } else if (string1 !== string2){   
    this.validCaptcha = false;    
    this.snackBar.open('Enetered Captcah is not Valid !!', 'Error', {
      duration: 2500,
      verticalPosition: 'top'
    });
  }

}

removeSpaces(string){
  return string.split(' ').join('');
}

}
