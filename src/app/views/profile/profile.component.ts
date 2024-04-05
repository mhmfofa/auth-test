import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { AppState } from 'src/app/auth/authStore/app.state';
import { selectUserInfoState } from 'src/app/auth/authStore/selectors/auth.selectors';
import { UserModel } from 'src/app/auth/models/user.model';

@Component({
  selector: 'app-profile',
  template: `
    <div class="d-flex align-items-center justify-content-center">
      <p>
        {{userInfo?.email | uppercase}}
      </p>
    </div>
  `,
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private store: Store<AppState>) {}


  public userInfo$ = this.store.select(selectUserInfoState);

  public userInfo: UserModel | null = null;
  public ngDestroyed$ = new Subject();


  ngOnInit(): void {
    this.userInfo$
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe((userInfo) => { this.userInfo = userInfo });
  }

  public ngOnDestroy() {
    this.ngDestroyed$.next(null);
  }

}
