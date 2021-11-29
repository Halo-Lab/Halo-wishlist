import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import AuthRequest from '../../api/request/AuthRequest';
import { MainLayout } from '../../components/layout/MainLayout';
import { IWishlist } from '../../models/IWishlist';
import { ListItem } from '../ListPage/components/ListItem';

import styles from './SharePage.module.scss';

export const SharePage = () => {
  const [lists, setLists] = useState<IWishlist | null | undefined>(null);

  const { listID } = useParams<{ listID: string }>();

  useEffect(() => {
    AuthRequest.getWishlist(listID)
      .then((res) => setLists(res.data))
      .catch((error) => console.log(error.response.data.message));
  }, []);

  return (
    <MainLayout>
      <div className={styles.itemsWrapper}>
        {lists?.items.map((item) => {
          return <ListItem key={item._id} data={item} />;
        })}
      </div>
    </MainLayout>
  );
};
