import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { Loader } from '../../components/common/Loader';
import { MainLayout } from '../../components/layout/MainLayout';
import { AppRootStateType } from '../../store/store';
import { UserStateType } from '../../store/user-reducer';
import {
  loadArchiveWishes,
  setWishlists,
  WishlistStateType,
} from '../../store/wishlist-reducer';
import { ListItem } from '../ListPage/components/ListItem';
import { WishlistCard } from './components/WishlistCard';

import styles from './AdminPage.module.scss';

export const AdminPage: React.FC = () => {
  const { isLoggedIn, user } = useSelector<AppRootStateType, UserStateType>(
    (state) => state.users,
  );
  const { archive, wishlists, isLoading } = useSelector<
    AppRootStateType,
    WishlistStateType
  >((state) => state.wishlist);
  const [activeTab, setActiveTab] = useState<number>(0);

  const { t } = useTranslation();

  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoggedIn && user.id) {
      dispatch(setWishlists(user.id));
      dispatch(loadArchiveWishes());
    }
  }, [isLoggedIn, user.id]);

  const changeTab = (tab: number) => setActiveTab(tab);

  const wishlistsTab =
    wishlists.length > 0 ? (
      <div className={styles.itemsWrapper}>
        {wishlists.map((i) => {
          return <WishlistCard key={i._id} data={i} />;
        })}
      </div>
    ) : (
      <h2>{t('emptyList')}</h2>
    );

  const archiveTab =
    archive.length > 0 ? (
      <div className={styles.itemsWrapper}>
        {archive.map((i) => {
          return <ListItem key={i._id} data={i} mode="archive" />;
        })}
      </div>
    ) : (
      <h2>{t('emptyArchive')}</h2>
    );

  const tabs = [t('wishlists'), t('archive')];

  return (
    <MainLayout tabs={tabs} changeTab={changeTab} activeTab={activeTab}>
      {activeTab === 0 && (isLoading ? <Loader /> : wishlistsTab)}
      {activeTab === 1 && (isLoading ? <Loader /> : archiveTab)}
    </MainLayout>
  );
};
