import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private _http: HttpClient) {}
  baseUrl = 'http://localhost:3003';

  checkLogin(email: string, password: string): Observable<any> {
    return this._http.get(`${this.baseUrl}/login/${email}/${password}`);
  }

  checkSignupEmail(email: any): Observable<any> {
    return this._http.get(`${this.baseUrl}/signupEmail/${email}`);
  }

  createUser(body: any): Observable<any> {
    return this._http.post(`${this.baseUrl}/createUser`, body);
  }

  createPoster(email: any, id: any, body: any): Observable<any> {
    return this._http.post(`${this.baseUrl}/createPoster/${email}/${id}`, body);
  }

  updatePoster(email: any, id: any, body: any): Observable<any> {
    return this._http.put(`${this.baseUrl}/updatePoster/${email}/${id}`, body);
  }
}
