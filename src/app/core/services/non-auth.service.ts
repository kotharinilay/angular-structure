import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { HttpClientService } from 'src/app/core/interceptors/http-client.service';
import { CompanyModel, UserStatusModel, UserLogin } from 'src/app/models';

@Injectable({
  providedIn: 'root'
})
export class NonAuthService {

  constructor(private httpService: HttpClientService) { }

  createUser(companyModel: CompanyModel) {
    return this.httpService.post(`api/Client/CreateClient`, companyModel);
  }

  loginUser(userModel: UserLogin) {
    return this.httpService.post(`api/Account/Login`, userModel)
      .pipe(
        catchError(error => {
          return throwError(error);
        }),
        map((response: any) => {
          return response;
        }));
  }

  ForgotPassword(email: string) {
    return this.httpService.get(`api/User/ForgotPassword?email=${email}`);
  }

  ValidateInviteUser(userId: string) {
    return this.httpService.get(`api/User/ValidateInviteUser?userId=${userId}`)
      .pipe(
        catchError(error => {
          return throwError(error);
        }
        ),
        map((response: any) => {
          return response;
        }));
  }

  UserActivation(userModel: UserStatusModel) {
    return this.httpService.put(`api/User/UserActivation`, userModel);

  }

  activeStatus(userId: string) {
    return this.httpService.get(`api/User/ValidateActiveUser?userId=${userId}`)
      .pipe(
        catchError(error => {
          return throwError(error);
        }
        ),
        map((response: any) => {
          return response;
        }));;

  }
}
