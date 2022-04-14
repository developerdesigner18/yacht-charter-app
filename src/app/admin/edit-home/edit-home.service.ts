import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
// import { JwtHelperService } from '@auth0/angular-jwt';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EditHomeService {
  private BASE_URI: string;

  constructor(
    private httpClient: HttpClient,
    // public jwtHelper: JwtHelperService
  ) {
    this.BASE_URI = environment.apiUrl    
  }

  // isAuthenticated(): boolean {
  //   // console.log (localStorage['token']);
  //   const token: any = localStorage.getItem('auth_token');
  //   // Check wheter the token is expired and return true or false
  //   return !this.jwtHelper.isTokenExpired(token);
  // }

  updateHomeData(page_id: any, payload: any): Observable<any> {
    let header = this.initHeaders();
    return this.httpClient.post(`${this.BASE_URI}/api/pages/updateHomeData`, payload, { params: { pid: page_id }, headers: header, observe: 'response' as 'body'}).pipe(
      catchError(this.handleError)
    )
  }

  private initHeaders() {
    let token: any = localStorage.getItem('auth_token');    
    var headers = new HttpHeaders();

    if (token !== null) {
      headers = headers.append('Authorization', token);
    }

    headers = headers
    .append('Access-Control-Allow-Origin', '*')
    // .append('Content-Type', 'undefined')
    // .append("Accept", "application/json")
    .append('Pragma', 'no-cache')
    .append('charset', 'utf-8')
    
    return headers;
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
