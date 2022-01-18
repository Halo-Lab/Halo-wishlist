import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { logoutUser } from '../../../store/user-reducer';

import logo from '../../../assets/svg/wishyou-logo.svg';

import styles from './SideBar.module.scss';

export const SideBar: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = () => {
    dispatch(logoutUser());
    history.push('/');
  };

  return (
    <div className={styles.sidebar}>
      <img className={styles.logo} src={logo} alt="wishyou logo" />
      <div className={styles.menu}>
        <h3>Main</h3>
        <ul className={styles.menuItems}>
          <li>Wishlists</li>
        </ul>
      </div>
      <div className={styles.settings}>
        <h3>Settings</h3>
        <button onClick={handleLogout} className={styles.logout}>
          Logout
        </button>
      </div>
    </div>
  );
};
