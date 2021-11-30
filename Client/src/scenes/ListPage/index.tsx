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
  const [lists, setLists] = useState<IWishlist | null | undefined>(null);
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
    } else {
      setLists(wishlists.find((items) => items._id === listId));
    }
  }, []);

  return (
    <MainLayout
      customTab={
        <CustomTab itemsCount={lists?.items.length} tabName={lists?.name} />
      }
      setLists={setLists}
      wishlistId={lists?._id}
    >
      <div className={styles.itemsWrapper}>
        {lists?.items.map((item) => {
          return <ListItem key={item._id} data={item} setLists={setLists} />;
        })}
      </div>
    </MainLayout>
  );
};
