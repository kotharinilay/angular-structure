import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MatSnackBar } from '@angular/material';

import { NonAuthService } from './../../../../core/services/non-auth.service';

@Component({
  selector: 'app-active-verification',
  templateUrl: './active-verification.component.html',
  styleUrls: ['./active-verification.component.scss']
})
export class ActiveVerificationComponent implements OnInit {
   userId: any;
   showText: boolean;
  constructor(private nonAuthService: NonAuthService, private snackBar: MatSnackBar,
    private activeRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.activeRoute.params.subscribe(params => {
      this.userId = params.userId;
      console.log(this.userId);
    });
    this.activateUser();
    
    this.nonAuthService.activeStatus(this.userId).subscribe(response => {
        this.snackBar.open('You are already registered!', 'Success', {
          duration: 2500,
          verticalPosition: 'top'
        });
      this.router.navigate(['./login']); 
    }, err => {
      this.router.navigate(['./login']); 
    })
    
  }

  activateUser() {
    const userModel = {
      userId:  this.userId,
      isActive: true,
    }
   this.nonAuthService.UserActivation(userModel).subscribe(response => {
    
   })
   return true;
  }

}
