import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginRequestModel, LoginResponseModel } from './models/auth-user.model';
import { environment } from 'environments/environment';

/**
 * @description Service in charge of registration, login and logout requests.
 *
 * @export AuthService
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  login(user: LoginRequestModel): Observable<LoginResponseModel> {
    return this.http.post<LoginResponseModel>(environment.urls.baseUrl + environment.urls.endPoints.login, user);
  }
}