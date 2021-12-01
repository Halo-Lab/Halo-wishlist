import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';

import { IWishlist } from '../../../../models/IWishlist';

import wishlistImg from '../../../../assets/png/wishlist.png';

import styles from './WishlistCard.module.scss';

const WishlistCard: React.FC<IProps> = ({ data, isListView }) => {
  const { name, items } = data;
  const history = useHistory();
  const { t } = useTranslation();

  return (
    <div
      className={isListView ? styles.container_list : styles.container}
      onClick={() => history.push(`/wishlists/${data._id}`)}
    >
      <img className={styles.background} src={wishlistImg} alt="card background" />
      <div className={styles.bottom}>
        <div className={styles.name}>{name}</div>
        <div className={styles.count}> {`${t('items')} ${items.length}`}</div>
      </div>
    </div>
  );
};

interface IProps {
  data: IWishlist;
  isListView: boolean;
}

export { WishlistCard };
