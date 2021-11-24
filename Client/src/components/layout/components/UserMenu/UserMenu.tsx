import { SyntheticEvent, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { logoutUser } from '../../../../store/user-reducer';
import { ButtonService } from '../../../common/ButtonSendForm/ButtonSendForm';
import Image from '../../../common/ImageComponent/Image';
import { AddWishlistModal } from '../AddWishlistModal/AddWishlistModal';

import add_icon from '../../../../assets/svg/addButton.svg';
import arrow_icon from '../../../../assets/svg/arrow.svg';
import logout_icon from '../../../../assets/svg/log-out.svg';
import settings_icon from '../../../../assets/svg/settings.svg';
import user_icon from '../../../../assets/svg/user.svg';

import styles from './UserMenu.module.scss';

const UserMenu: React.FC<IProps> = ({ userPic }) => {
  const [isNav, setIsNav] = useState<boolean>(false);
  const [isModal, setIsModal] = useState<boolean>(false);

  const navRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();
  const toggleNav = () => setIsNav((prev) => !prev);
  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const closeMenu = (event: SyntheticEvent) => {
    if (navRef.current === event.target) {
      setIsNav(false);
    }
  };

  return (
    <div className={styles.menu_container}>
      {isModal && <AddWishlistModal isModal={isModal} setIsModal={setIsModal} />}

      <ButtonService
        btnName="New"
        className={styles.addButton}
        handleClickButton={() => setIsModal(true)}
      >
        <img src={add_icon} alt="menu-arrow" className={styles.icon} />
      </ButtonService>
      <div className={styles.menu_toggle} onClick={toggleNav}>
        <Image
          alt="user"
          src={userPic}
          width={50}
          height={50}
          circle
          className={styles.userPic}
        />
        <img src={arrow_icon} alt="menu-arrow" />
      </div>
      {isNav && (
        <div className={styles.nav_overlay} ref={navRef} onClick={closeMenu}>
          <nav className={styles.nav}>
            <div className={styles.link}>
              <NavLink
                to={{
                  pathname: '/admin',
                }}
                activeClassName={styles.selected}
              >
                <img src={user_icon} alt="user" />
                Profile
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
                Settings
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
                Log Out
              </NavLink>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
};

interface IProps {
  userPic: string;
}

export { UserMenu };
