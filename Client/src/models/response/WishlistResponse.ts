import { IWishlist } from '../IWishlist';

export interface WishlistResponse {
  userId: string;
  name: string;
  items: IWishlist[];
}
