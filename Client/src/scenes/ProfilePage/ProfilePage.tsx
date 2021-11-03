import { FC } from 'react';

import { MainProfile } from './components/MainProfile';
import { SideBar } from './components/SideBar';

import styles from './ProfilePage.module.scss';

interface ITest {
  email: string;
  id: string;
  isActivated: boolean;
}

export const ProfilePage: FC<ITest> = () => {
  return (
    <div className={styles.profileWrapper}>
      <SideBar />
      <MainProfile />
    </div>
  );
};
