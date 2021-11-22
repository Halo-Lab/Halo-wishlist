export interface IUser {
  email: string;
  isActivated: boolean;
  id: string;
  name: string;
  bio: string;
  date: string;
  userPic: string;
  wishlist: Array<string>
}

export interface ILogin {
  email: string;
  password: string;
  remember?: boolean;
}
