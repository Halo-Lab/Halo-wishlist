import { IProduct } from './IProduct';

export interface IWishlist {
  _id: string;
  userId: string;
  name: string;
  userName: string;
  date: string;
  userPic: string;
  items: IProduct[];
}
