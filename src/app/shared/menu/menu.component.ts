import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { logOut, setStoreData } from 'src/app/auth/authStore/actions/auth.actions';
import { AppState } from 'src/app/auth/authStore/app.state';
import { selectIsAuthenticatedState, selectUserInfoState } from 'src/app/auth/authStore/selectors/auth.selectors';
import { UserModel } from 'src/app/auth/models/user.model';
import { SessionService } from 'src/app/auth/services/session.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(private store: Store<AppState>, private sessionService: SessionService) {}

  public isLogged$ = this.store.select(selectIsAuthenticatedState);
  public userInfo$ = this.store.select(selectUserInfoState);
  public destroyed$ = new Subject();

  public ngOnDestroy() {
    this.destroyed$.next(null);
  }

  ngOnInit(): void {
    const storedUserData: UserModel | null = this.sessionService.storedUserData;

    if (storedUserData) {
      this.store.dispatch(setStoreData({payload:storedUserData}))
    }
  }

  logOut() {
    this.store.dispatch(logOut())
  }

}
