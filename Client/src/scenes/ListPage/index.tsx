import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { MainLayout } from '../../components/layout/MainLayout';
import { IUser } from '../../models/IUser';
import { IWishlist } from '../../models/IWishlist';
import { AppRootStateType } from '../../store/store';
import { setWishlists } from '../../store/wishlist-reducer';
import { CustomTab } from './components/CustomTab';
import { ListItem } from './components/ListItem';

import styles from './ListPage.module.scss';

export const ListPage = () => {
  const user = useSelector<AppRootStateType, IUser>((state) => state.users.user);
  const wishlists = useSelector<AppRootStateType, IWishlist[]>(
    (state) => state.wishlist.wishlists,
  );
  const dispatch = useDispatch();
  // const [serverError, setServerError] = useState<string>('');

  const { listId } = useParams<{ listId: string }>();

  useEffect(() => {
    if (!wishlists.find((items) => items._id === listId)) {
      dispatch(setWishlists(user.id));
    }
  }, []);
  const wishlistIndex = wishlists.findIndex((w) => w._id === listId);

  return (
    <MainLayout
      customTab={
        <CustomTab
          itemsCount={wishlists[wishlistIndex]?.items.length}
          tabName={wishlists[wishlistIndex]?.name}
        />
      }
      wishlistId={wishlists[wishlistIndex]?._id}
    >
      <div className={styles.itemsWrapper}>
        {wishlistIndex > -1 &&
          wishlists[wishlistIndex]?.items.map((item) => {
            return <ListItem key={item._id} data={item} />;
          })}
      </div>
    </MainLayout>
  );
};
