import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EditBoatInfoService {
  private BASE_URI: string;

  constructor(
    private httpClient: HttpClient,
  ) {
    this.BASE_URI = environment.apiUrl    
  }

  getBoatInfoAll(
  ): Observable<any> {
    return this.httpClient.get(`${this.BASE_URI}/api/boat/getBoatInfoAll`).pipe(
      catchError(this.handleError)
    )
  }

  changeBoatStatus(boat_id: any, status: any): Observable<any> {
    let header = this.initHeaders();
    return this.httpClient.post(`${this.BASE_URI}/api/boat/changeBoatStatus`,{}, { params: { bid: boat_id, status: status }, headers: header, observe: 'response' as 'body'}).pipe(
      catchError(this.handleError)
    )
  }

  insertBoatInfo(payload: any): Observable<any> {
    let header = this.initHeaders();
    return this.httpClient.post(`${this.BASE_URI}/api/boat/insertBoatInfo`, payload, { headers: header, observe: 'response' as 'body'}).pipe(
      catchError(this.handleError)
    )
  }

  updateBoatInfo(boat_id: any, payload: {
  }): Observable<any> {
    let header = this.initHeaders();
    return this.httpClient.post(`${this.BASE_URI}/api/boat/updateBoatInfo`, payload, { params: { bid: boat_id }, headers: header, observe: 'response' as 'body'}).pipe(
      catchError(this.handleError)
    )
  }

    
  deleteBoatImage(boat_id: any, image_id: any): Observable<any> {
    let header = this.initHeaders();
    return this.httpClient.delete(`${this.BASE_URI}/api/boat/deleteBoatImage`, { params: { bid: boat_id, iid: image_id }, headers: header, observe: 'response' as 'body'}).pipe(
      catchError(this.handleError)
    )
  }

  deleteBoatInfo(boat_id: any): Observable<any> {
    let header = this.initHeaders();
    return this.httpClient.delete(`${this.BASE_URI}/api/boat/deleteBoatInfo`, { params: { bid: boat_id }, headers: header, observe: 'response' as 'body'}).pipe(
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
