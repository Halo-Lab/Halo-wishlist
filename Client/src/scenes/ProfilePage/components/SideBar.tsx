import { FC } from 'react';
import { useDispatch } from 'react-redux';

import { logoutUser } from '../../../store/user-reducer';

import wishliLogo from '../../../assets/svg/wishli-logo.svg';

import styles from './SideBar.module.scss';

export const SideBar: FC = () => {
  const dispatch = useDispatch();

  return (
    <div className={styles.sidebar}>
      <img className={styles.logo} src={wishliLogo} alt="Wishli logo"></img>
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
  );
};
