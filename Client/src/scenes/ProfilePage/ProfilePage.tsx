import { FC } from 'react';
import { useDispatch } from 'react-redux';

import { MainProfile } from './components/MainProfile';
import { SideBar } from './components/SideBar';

import styles from './ProfilePage.module.scss';

interface ITest {
  email: string;
  id: string;
  isActivated: boolean;
}

export const ProfilePage: FC<ITest> = ({ email, id, isActivated }) => {
  const dispatch = useDispatch();

  return (
    <div className={styles.profileWrapper}>
      <SideBar />
      <MainProfile />
    </div>
  );
};
