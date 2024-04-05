import { createReducer, on } from '@ngrx/store';
import { login, loginFailure, loginSuccess, logOut, setStoreData } from '../actions/auth.actions';
import { UserModel } from './../../models/user.model';

export interface AuthState {
  isAuthenticated: boolean;
  user: UserModel | null;
  error: any
  status: string
}

export const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  error: '',
  status: ''
};

export const authReducer = createReducer(
  initialState,
  on(login, (state) => ({ ...state, status: 'loading' })),
  on(loginSuccess, (state, { payload }) =>
  ({
    ...state,
    isAuthenticated: true,
    user: { email: payload.email, username: payload.username, token: payload.token, expiresIn: payload.expiresIn, isLogged: payload.isLogged },
    status: 'success'
  })
  ),
  on(loginFailure, (state, { error }) =>
  ({
    ...state,
    isAuthenticated: false,
    user: null,
    error: error,
    status: 'error'
  })
  ),
  on(logOut, (state) =>
  ({
    ...state,
    isAuthenticated: false,
    user: null,
    error: null,
    status: 'success'
  })
  ),
  on(setStoreData, (state, { payload }) =>
  ({
    ...state,
    isAuthenticated: true,
    user: { email: payload.email, username: payload.username, token: payload.token, expiresIn: payload.expiresIn, isLogged: payload.isLogged },
    status: 'success'
  })
  ),
)
