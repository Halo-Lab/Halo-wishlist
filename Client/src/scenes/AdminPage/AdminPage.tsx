import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { Loader } from '../../components/common/Loader';
import { MainLayout } from '../../components/layout/MainLayout';
import { IUser } from '../../models/IUser';
import { IWishlist } from '../../models/IWishlist';
import { AppRootStateType } from '../../store/store';
import { setWishlists } from '../../store/wishlist-reducer';
import { WishlistCard } from './components/WishlistCard';

import styles from './AdminPage.module.scss';

export const AdminPage: React.FC = () => {
  const user = useSelector<AppRootStateType, IUser>((state) => state.users.user);
  const wishlists = useSelector<AppRootStateType, IWishlist[]>(
    (state) => state.wishlist.wishlists,
  );
  const [activeTab, setActiveTab] = useState<number>(0);
  const { t } = useTranslation();

  const dispatch = useDispatch();
  useEffect(() => {
    if (user.id) {
      dispatch(setWishlists(user.id));
    }
  }, [user]);

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

  const archiveTab = <h2>{t('emptyArchive')}</h2>;
  const tabs = [t('wishlists'), t('archive')];

  return (
    <MainLayout tabs={tabs} changeTab={changeTab} activeTab={activeTab}>
      {activeTab === 0 && wishlistsTab}
      {activeTab === 1 && archiveTab}
    </MainLayout>
  );
};
