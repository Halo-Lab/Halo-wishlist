import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';

import AuthRequest from '../../api/request/AuthRequest';
import { MainLayout } from '../../components/layout/MainLayout';
import { IWishlist } from '../../models/IWishlist';
import { AppRootStateType } from '../../store/store';
import { UserStateType } from '../../store/user-reducer';
import * as notify from '../../utils/notifications';
import { CustomTab } from '../ListPage/components/CustomTab';
import { ListItem } from '../ListPage/components/ListItem';

import styles from './SharePage.module.scss';

export const SharePage = () => {
  const [lists, setLists] = useState<IWishlist | null | undefined>(null);
  const user = useSelector<AppRootStateType, UserStateType>((state) => state.users);

  const { listID } = useParams<{ listID: string }>();

  useEffect(() => {
    let cleanupFunction = false;
    AuthRequest.getWishlist(listID)
      .then((res) => !cleanupFunction && setLists(res.data))
      .catch((error) => notify.warn(error.response.data.message));
    return () => {
      cleanupFunction = true;
    };
  }, []);

  return (
    <MainLayout
      customTab={
        <CustomTab itemsCount={lists?.items.length} tabName={lists?.name} />
      }
      nameSh={lists?.userName}
      userPicSh={lists?.userPic}
      birthdaySh={lists?.date}
      hideMenu={!user.isLoggedIn}
    >
      <div className={styles.itemsWrapper}>
        {lists?.items.map((item) => {
          return (
            <ListItem key={item._id} data={item} sharedPage={!user.isLoggedIn} />
          );
        })}
      </div>
    </MainLayout>
  );
};
