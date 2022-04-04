import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { environment } from '../../environments/environment';
import { catchError, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private BASE_URI: string;
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(
    private http: HttpClient
  ) {
    this.BASE_URI = environment.apiUrl;
  }

  getHomeData(
  ): Observable<any> {
    return this.http.get(`${this.BASE_URI}/api/home/getHomeData`, { headers: { Authorization: localStorage.getItem('token') } }).pipe(
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
