import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
// import { JwtHelperService } from '@auth0/angular-jwt';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EditHomeService {
  private BASE_URI: string;
  private U_TOKEN: any;
  headers: any;

  constructor(
    private httpClient: HttpClient,
    // public jwtHelper: JwtHelperService
  ) {
    this.BASE_URI = environment.apiUrl
    this.U_TOKEN = localStorage.getItem('auth_token')
    this.headers.set('Content-Type', 'undefined');
    this.headers.set('Authorization', this.U_TOKEN);
    
  }

  // isAuthenticated(): boolean {
  //   // console.log (localStorage['token']);
  //   const token: any = localStorage.getItem('auth_token');
  //   // Check wheter the token is expired and return true or false
  //   return !this.jwtHelper.isTokenExpired(token);
  // }

  insertHomeData(pid: any, payload: {
  }): Observable<any> {
    console.log(pid, payload, this.headers, this.BASE_URI, this.U_TOKEN);
    
    return this.httpClient.post(`${this.BASE_URI}/api/home/insertHomeData`, payload, { params: { pid: pid }, headers: this.headers }).pipe(
      catchError(this.handleError)
    )
  }

  private handleError(error: HttpErrorResponse) {
    let msg = '';    
      
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
      msg = 'An error occurred:', error.error.message;
    } else {
    
    }
    return throwError(msg);
  }
}
