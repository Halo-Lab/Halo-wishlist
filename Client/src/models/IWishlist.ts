import { IProduct } from './IProduct';

export interface IWishlist {
  userId: string;
  name: string;
  items: IProduct[];
}
