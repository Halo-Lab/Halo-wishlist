import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import WishlistRequest from '../../api/request/WishlistRequest';
import { MainLayout } from '../../components/layout/MainLayout';
import { IUser } from '../../models/IUser';
import { IWishlist } from '../../models/IWishlist';
import { AppRootStateType } from '../../store/store';
import { WishlistCard } from './components/WishlistCard';

import styles from './AdminPage.module.scss';

export const AdminPage: React.FC = () => {
  const [wishlists, setWishlists] = useState<IWishlist[]>([]);
  const user = useSelector<AppRootStateType, IUser>((state) => state.users.user);
  const [isListView, setIsListView] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<number>(0);

  useEffect(() => {
    WishlistRequest.getWishlists(user.id).then((res) => {
      setWishlists(res.data);
    });
  }, []);

  const changeView = () => setIsListView((prev) => !prev);
  const changeTab = (tab: number) => setActiveTab(tab);

  const wishlistsTab = (
    <div className={styles.cardType}>
      {wishlists.map((i) => {
        return <WishlistCard key={i['_id']} data={i} isListView={isListView} />;
      })}
    </div>
  );

  const archiveTab = <h2>Archive is empty</h2>;
  const tabs = ['Wishlists', 'Archive'];

  return (
    <MainLayout
      changeView={changeView}
      tabs={tabs}
      changeTab={changeTab}
      activeTab={activeTab}
    >
      {activeTab === 0 && wishlistsTab}
      {activeTab === 1 && archiveTab}
    </MainLayout>
  );
};
