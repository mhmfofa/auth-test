import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, from, map, of, switchMap, tap } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { SessionService } from '../../services/session.service';
import { login, loginFailure, loginSuccess, logOut } from '../actions/auth.actions';

@Injectable()
export class AuthEffects {

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private sessionService: SessionService
  ) {}


  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      switchMap((props) =>
        from(this.authService.login(props.payload)).pipe(
          tap((response) => {
            sessionStorage.setItem('authData', JSON.stringify(response))
            this.sessionService.startSessionTimer(response?.expiresIn);
          }),
          map((response) => loginSuccess({payload:response})),
          catchError((error) => of(loginFailure(error)))
        )
      )
    )
  )

  logOut$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logOut),
      tap(() => {
        sessionStorage.removeItem('authData');
        this.sessionService.clearSessionTimer();
      })
    )
  )
}
