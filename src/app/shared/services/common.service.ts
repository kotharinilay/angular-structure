import { Injectable } from '@angular/core';

@Injectable()
export class CommonService {

  constructor() { }

  getToken() {
    return localStorage.getItem("auth-token") || null;
  }

}
