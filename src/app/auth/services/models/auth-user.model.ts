export interface LoginRequestModel {
  email: string;
  password: string
}

export interface LoginResponseModel {
  username: string,
  email: string,
  token: string;
  expiresIn: number;
  isLogged: boolean;
}

