import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import WishlistRequest from '../../api/request/WishlistRequest';
import { Loader } from '../../components/common/Loader';
import { MainLayout } from '../../components/layout/MainLayout';
import { IProduct } from '../../models/IProduct';
import { IUser } from '../../models/IUser';
import { IWishlist } from '../../models/IWishlist';
import { AppRootStateType } from '../../store/store';
import { setWishlists } from '../../store/wishlist-reducer';
import * as notify from '../../utils/notifications';
import { ListItem } from '../ListPage/components/ListItem';
import { WishlistCard } from './components/WishlistCard';

import styles from './AdminPage.module.scss';

export const AdminPage: React.FC = () => {
  const user = useSelector<AppRootStateType, IUser>((state) => state.users.user);
  const wishlists = useSelector<AppRootStateType, IWishlist[]>(
    (state) => state.wishlist.wishlists,
  );
  const [activeTab, setActiveTab] = useState<number>(0);
  const [archiveWishes, setArchiveWishes] = useState<IProduct[]>([]);
  const { t } = useTranslation();

  const dispatch = useDispatch();
  useEffect(() => {
    if (user.id) {
      dispatch(setWishlists(user.id));
    }
  }, [user]);

  useEffect(() => {
    if (activeTab === 1) {
      WishlistRequest.getArchiveWishes()
        .then((res) => setArchiveWishes(res.data))
        .catch((error) => notify.error(error.response.data.error));
    }
  }, [activeTab]);

  const changeTab = (tab: number) => setActiveTab(tab);

  const wishlistsTab =
    wishlists.length > 0 ? (
      <div className={styles.itemsWrapper}>
        {wishlists.map((i) => {
          return <WishlistCard key={i._id} data={i} />;
        })}
      </div>
    ) : (
      <Loader />
    );
  const archiveTab =
    archiveWishes.length > 0 ? (
      <div className={styles.itemsWrapper}>
        {archiveWishes.map((i) => {
          return <ListItem key={i._id} data={i} />;
        })}
      </div>
    ) : (
      <h2>{t('emptyArchive')}</h2>
    );

  const tabs = [t('wishlists'), t('archive')];

  return (
    <MainLayout tabs={tabs} changeTab={changeTab} activeTab={activeTab}>
      {activeTab === 0 && wishlistsTab}
      {activeTab === 1 && archiveTab}
    </MainLayout>
  );
};
