export interface UserModel {
  username: string;
  email: string;
  token: string;
  expiresIn: number;
  isLogged: boolean;
}
