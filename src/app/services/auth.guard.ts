import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
    ) { }
    
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    var checkLogin = this.checkLogin()
    if (checkLogin) {
      var isTokenExpired = this.authService.checkTokenStatus();
      if (!isTokenExpired) {
        // expired
        this.router.navigateByUrl('/admin/login');
        return isTokenExpired;
      } else {
        // not expired
        return isTokenExpired;
      }
    } else {
      this.router.navigateByUrl('/')
      return false;
    }
  }

  checkLogin() {
    if (this.authService.isLoggedIn()) {
      // token found
      return true;
    } else {
      // token not found
      return false;
    }
  }
  
}
