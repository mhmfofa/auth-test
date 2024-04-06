import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { AppState } from 'src/app/auth/authStore/app.state';
import { selectUserInfoState } from 'src/app/auth/authStore/selectors/auth.selectors';
import { UserModel } from 'src/app/auth/models/user.model';

@Component({
  selector: 'app-profile',
  template: `
    <div class="d-flex mt-5 align-items-center justify-content-center">
      <p>Hello {{(userInfo$ | async)?.email | uppercase}}</p>
    </div>
  `,
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  
  constructor(private store: Store<AppState>) {}

  public userInfo$: Observable<UserModel | null> = new Observable<UserModel | null>;
  public ngDestroyed$ = new Subject();

  ngOnInit(): void {
    this.userInfo$ = this.store.select(selectUserInfoState);
  }

  public ngOnDestroy() {
    this.ngDestroyed$.next(null);
  }

}
