import { IProduct } from './IProduct';

export interface IWishlist {
  _id: string;
  userId: string;
  name: string;
  items: IProduct[];
}
