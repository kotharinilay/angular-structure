import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';

@Injectable()
export class AuthService {

  constructor() { }

  getAuthToken() {
    return localStorage.getItem('auth-token') || null;
  }

  setAuhToken(token: string) {
    localStorage.setItem('auth-token', token);
  }

  refreshToken(): Observable<string> {
    /*
        The call that goes in here will use the existing refresh token to call
        a method on the oAuth server (usually called refreshToken) to get a new
        authorization token for the API calls.
    */

    return Observable.of('new-token-string').delay(200);
  }
}
