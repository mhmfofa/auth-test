import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { login } from '../../authStore/actions/auth.actions';
import { AppState } from '../../authStore/app.state';
import { loginFormModel } from '../../models/forms.model';
import { LoginRequestModel } from '../../services/models/auth-user.model';
import { USER_NAME_RGX } from '../../constants/auth.constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private store: Store<AppState>) {}

  public loginForm = new FormGroup<loginFormModel>({
    email: new FormControl('', [Validators.pattern(USER_NAME_RGX), Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  onSubmit() {
    if (this.loginForm.valid) {
      const userLogin: LoginRequestModel = {
        email: this.loginForm.value.email ? this.loginForm.value.email : '',
        password: this.loginForm.value.password ? this.loginForm.value.password : '',
      }
      this.store.dispatch(login({payload: userLogin}))
    }
  }

}
