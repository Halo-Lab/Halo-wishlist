import { IWishlist } from '../../../../models/IWishlist';

import wishlistImg from '../../../../assets/png/wishlist.png';

import styles from './WishlistCard.module.scss';

const WishlistCard: React.FC<IProps> = ({ data, isListView }) => {
  const { name, items } = data;

  return (
    <div className={isListView ? styles.container : styles.container_list}>
      <img className={styles.background} src={wishlistImg} alt="card background" />
      <div className={styles.bottom}>
        <div className={styles.name}>{name}</div>
        <div className={styles.count}> {`Items ${items.length}`}</div>
      </div>
    </div>
  );
};

interface IProps {
  data: IWishlist;
  isListView: boolean;
}

export { WishlistCard };
