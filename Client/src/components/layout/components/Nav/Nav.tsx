import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { logoutUser } from '../../../../store/user-reducer';

import logout_icon from '../../../../assets/svg/log-out.svg';
import settings_icon from '../../../../assets/svg/settings.svg';
import user_icon from '../../../../assets/svg/user.svg';

import styles from './Nav.module.scss';

type NavMenuType = {
  name: string;
  path: string;
  id: number;
  image: string;
  handleLogout?: () => void;
};

const Nav: React.FC<IProps> = ({ isShow }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const navMenu: Array<NavMenuType> = [
    {
      name: t('nav.profile'),
      path: '/',
      id: 0,
      image: user_icon,
    },
    {
      name: t('nav.settings'),
      path: '/settings',
      id: 1,
      image: settings_icon,
    },
    {
      name: t('nav.logout'),
      path: '/login',
      id: 3,
      image: logout_icon,
      handleLogout: () => {
        dispatch(logoutUser());
      },
    },
  ];

  return (
    <nav className={cn(styles.nav, { [styles.show_nav]: isShow })}>
      {navMenu.map((i) => {
        return (
          <div key={i.id} className={styles.link}>
            <NavLink
              to={i.path}
              activeClassName={styles.selected}
              onClick={i.handleLogout}
            >
              <img src={i.image} alt={i.name} />
              {i.name}
            </NavLink>
          </div>
        );
      })}
    </nav>
  );
};

interface IProps {
  isShow: boolean;
}

export { Nav };
