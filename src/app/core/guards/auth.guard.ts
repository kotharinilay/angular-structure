import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad } from '@angular/router';
import { AuthService } from '../services';


@Injectable()
export class AuthGuard implements CanLoad {
  canLoad(route: import('@angular/router').Route,
    segments: import('@angular/router').UrlSegment[]): boolean | import('rxjs').Observable<boolean> | Promise<boolean> {
    const token = this.authService.getAuthToken();
    if (token) {
      // logged in so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/']);
    return false;
  }

  constructor(private router: Router, private authService: AuthService) { }

  // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

  // }
}
