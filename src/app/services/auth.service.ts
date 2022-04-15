import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private jwtHelper: JwtHelperService
    ) { }

    checkTokenStatus() {
    const token: any = localStorage.getItem('auth_token');
    if (this.jwtHelper.isTokenExpired(token)) {
      // token expired 
      return false;
    } else {
      // token valid
      return true;
    }
  }

  isLoggedIn() {
    if (localStorage.getItem('auth_token')) {
      return true;
    }
    return false;
  }
}
