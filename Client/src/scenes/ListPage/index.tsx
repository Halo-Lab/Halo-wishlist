import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import AuthRequest from '../../api/request/AuthRequest';
import { MainLayout } from '../../components/layout/MainLayout';
import { IWishlist } from '../../models/IWishlist';
import { AppRootStateType } from '../../store/store';
import { CustomTab } from './components/CustomTab';
import { ListItem } from './components/ListItem';

import styles from './ListPage.module.scss';

export const ListPage = () => {
  const [lists, setLists] = useState<IWishlist | null>(null);
  const wishlists = useSelector<AppRootStateType, IWishlist[]>(
    (state) => state.wishlist.wishlists,
  );

  // const [serverError, setServerError] = useState<string>('');

  const { listId } = useParams<{ listId: string }>();

  useEffect(() => {
    if (!wishlists.find((items) => items._id === listId)) {
      AuthRequest.getWishlist(listId)
        .then((res) => setLists(res.data))
        .catch((error) => console.log(error.response.data.message));
    }
  }, []);

  return (
    <MainLayout customTab={<CustomTab itemsCount={lists?.items.length} />}>
      <div className={styles.itemsWrapper}>
        {lists?.items.map((item) => {
          return <ListItem key={item._id} image={item.image} />;
        })}
      </div>
    </MainLayout>
  );
};
