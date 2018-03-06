import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Login } from 'app/models/login';
import { AuthService } from 'app/shared/services/auth.service';

@Injectable()
export class LoginService {

  constructor(private authService: AuthService) { }

  login(loginModel: Login) {
    return Observable.create(observer => {
      if (loginModel.username === 'test' && loginModel.password === 'test') {
        this.authService.setAuhToken('any-token-string');
        observer.next(true);
      } else {
        observer.next(false);
      }
      observer.complete();
    });
  }
}
