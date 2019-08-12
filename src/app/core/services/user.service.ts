import { Injectable } from '@angular/core';

import { HttpClientService } from 'src/app/core/interceptors/http-client.service';
import {
  UserModel,
  EditUserModel,
  ChangePasswordModel,
  UserStatusModel,
  ResetPasswordModel
} from 'src/app/models';

const defaultAvatarUrl = '';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private httpService: HttpClientService) { }

  getUsers(companyId: string) {
    return this.httpService.get(`api/User/GetUserList?clientId=${companyId}`);
  }

  addUsers(user: UserModel) {
    return this.httpService.post(`api/User/CreateUser`, user);
  }

  editUserProfile(userModel: EditUserModel) {
    return this.httpService.put(`api/User/UpdateUser`, userModel);
  }

  changePassword(passwordModel: ChangePasswordModel) {
    return this.httpService.put(`api/User/UpdateUserPassword`, passwordModel);
  }

  resetPassword(passwordModel: ResetPasswordModel) {
    return this.httpService.put(`api/User/UpdateUserPassword`, passwordModel);
  }

  deleteUser(userId: string) {
    return this.httpService.delete(`api/User/UserDelete?userId=${userId}`);
  }

  changeUserStatus(userStatus: UserStatusModel) {
    return this.httpService.put(`api/User/UserActivation`, userStatus);
  }

  changeAvatar(formData: FormData, userId: string) {
    //const header = { 'Content-Type': 'multipart/form-data' }
    return this.httpService.post(
      `api/User/UploadProfilePicImage?userId=${userId}`,
      formData, { 'Content-Type': 'multipart/form-data' }
    );
  }

}
