import { Injectable } from '@angular/core';
import { Router, CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { AuthService } from '../services';


@Injectable()
export class SkipLoginGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const token = this.authService.getAuthToken();
    if (token) {
      this.router.navigate(['/dashboard']);
      return false;
    } else {
      return true;
    }
  }
}
