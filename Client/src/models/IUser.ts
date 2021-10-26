export interface IUser {
  email: string;
  isActivated: boolean;
  id: string;
}

export interface ILogin {
  email: string;
  password: string;
  remember?: boolean;
}
