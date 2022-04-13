import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EditQSpdService {
  private BASE_URI: string;

  constructor(
    private httpClient: HttpClient,
  ) {
    this.BASE_URI = environment.apiUrl
  }

  updateQSpdData(page_id: any, payload: {
  }): Observable<any> {
    let header = this.initHeaders();
    return this.httpClient.post(`${this.BASE_URI}/api/pages/updateQSpdData`, payload, { params: { pid: page_id }, headers: header, observe: 'response' as 'body'}).pipe(
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
    .append('Content-Type', 'undefined')
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
