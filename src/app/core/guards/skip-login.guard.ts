import { Injectable } from '@angular/core';
import { Router, CanLoad } from '@angular/router';

import { Observable } from 'rxjs';
import { AuthService } from '../services';


@Injectable()
export class SkipLoginGuard implements CanLoad {
  canLoad(route: import('@angular/router').Route,
    segments: import('@angular/router').UrlSegment[]): boolean | Observable<boolean> | Promise<boolean> {
    const token = this.authService.getAuthToken();
    if (token) {
      this.router.navigate(['/dashboard']);
      return false;
    } else {
      return true;
    }
  }

  constructor(private router: Router, private authService: AuthService) { }
}
