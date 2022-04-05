import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EditHomeService {
  private BASE_URI: string;
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(
    private httpClient: HttpClient,
    public jwtHelper: JwtHelperService
  ) { }

  isAuthenticated(): boolean {
    // console.log (localStorage['token']);
    const token = localStorage.getItem('auth_token');
    // Check wheter the token is expired and return true or false
    return !this.jwtHelper.isTokenExpired(token);
  }

  getHomeData(payload: {
  }): Observable<any> {
    return this.httpClient.post(`${this.BASE_URI}/api/home/insertHomeData`, payload, { headers: { Authorization: localStorage.getItem('auth_token') } }).pipe(
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
