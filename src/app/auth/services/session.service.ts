import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { logOut } from '../authStore/actions/auth.actions';
import { AppState } from '../authStore/app.state';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  get storedUserData(): UserModel | null {
    const data = localStorage.getItem('authData');
    return data ? JSON.parse(data) : null
  }

  private timeoutId: any;

  constructor(private store: Store<AppState>, private router: Router) {}

  startSessionTimer(duration: number | undefined) {
    if (duration) {
      this.timeoutId = setTimeout(() => {
        this.store.dispatch(logOut());
        this.router.navigate(["/login"]);
      }, duration - 1000);
    }
  }

  clearSessionTimer() {
    clearTimeout(this.timeoutId);
  }
}

