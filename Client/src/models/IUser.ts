export interface IUser {
  email: string;
  isActivated: boolean;
  id: string;
  userPic: string
}

export interface ILogin {
  email: string;
  password: string;
  remember?: boolean;
}
