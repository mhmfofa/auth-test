import { createAction, props } from '@ngrx/store';
import { UserModel } from '../../models/user.model';
import { LoginRequestModel, LoginResponseModel } from '../../services/models/auth-user.model';


export const login = createAction(
  '[Auth] Login',
  props<{payload:LoginRequestModel}>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{payload:LoginResponseModel}>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: any }>()
);

export const logOut = createAction('[Auth] Logout');

export const setStoreData = createAction(
  '[Auth] setStoreData',
  props<{payload:UserModel}>()
);


export type AuthActions = typeof login | typeof loginSuccess | typeof loginFailure |
  typeof logOut | typeof setStoreData;
