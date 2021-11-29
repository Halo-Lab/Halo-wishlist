import { useDetectClickOutside } from 'react-detect-click-outside';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { logoutUser } from '../../../../store/user-reducer';

import logout_icon from '../../../../assets/svg/log-out.svg';
import settings_icon from '../../../../assets/svg/settings.svg';
import user_icon from '../../../../assets/svg/user.svg';

import styles from './Nav.module.scss';

const Nav: React.FC<IProps> = ({ closeToggle }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const ref = useDetectClickOutside({ onTriggered: closeToggle });

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <nav className={styles.nav} ref={ref}>
      <div className={styles.link}>
        <NavLink
          to={{
            pathname: '/',
          }}
          activeClassName={styles.selected}
        >
          <img src={user_icon} alt="user" />
          {t('nav.profile')}
        </NavLink>
      </div>
      <div className={styles.link}>
        <NavLink
          to={{
            pathname: '/settings',
          }}
          activeClassName="selected"
        >
          <img src={settings_icon} alt="settings" />
          {t('nav.settings')}
        </NavLink>
      </div>
      <div className={styles.link}>
        <NavLink
          to={{
            pathname: '/',
          }}
          activeClassName="selected"
          onClick={handleLogout}
        >
          <img src={logout_icon} alt="logOut" />
          {t('nav.logout')}
        </NavLink>
      </div>
    </nav>
  );
};

interface IProps {
  closeToggle: (event: Event) => void;
}

export { Nav };
