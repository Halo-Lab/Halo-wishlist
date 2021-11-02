import { FC } from 'react';
import { useDispatch } from 'react-redux';

import { logoutUser } from '../../store/user-reducer';

import wishliLogo from '../../assets/svg/wishli-logo.svg';

import styles from './ProfilePage.module.scss';

interface ITest {
  email: string;
  id: string;
  isActivated: boolean;
}

export const Test: FC<ITest> = ({ email, id, isActivated }) => {
  const dispatch = useDispatch();

  return (
    <div className={styles.profileWrapper}>
      <div className={styles.sidebar}>
        <img className={styles.logo} src={wishliLogo}></img>
        <div className={styles.menu}>
          <h3>Main</h3>
          <ul className={styles.menuItems}>
            <li>Wishlists</li>
          </ul>
        </div>
        <div className={styles.settings}>
          <h3>Settings</h3>
          <button onClick={() => dispatch(logoutUser())} className={styles.logout}>
            Logout
          </button>
        </div>
      </div>
      <div className={styles.main}></div>
    </div>
  );
};
