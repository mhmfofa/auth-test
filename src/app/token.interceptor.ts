import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserModel } from './auth/models/user.model';
import { SessionService } from './auth/services/session.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private sessionService: SessionService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const storedUserData: UserModel | null = this.sessionService.storedUserData;

    if(storedUserData)
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${storedUserData.token}`,
          ['content-Type']: 'application/json;charset=UTF-8',
        }
      });
    else
      request = request.clone({
        setHeaders: {
          ['content-Type']: 'application/json;charset=UTF-8',
        }
      });

    return next.handle(request);
  }
}
