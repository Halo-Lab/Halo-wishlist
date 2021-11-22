export interface IUser {
  email: string;
  isActivated: boolean;
  id: string;
  userPic: string;
  bio: string;
  date: any;
  name: string;
  nickName: string;
  facebook: string;
  instagram: string;
  twitter: string;
}

export interface ILogin {
  email: string;
  password: string;
  remember?: boolean;
}
