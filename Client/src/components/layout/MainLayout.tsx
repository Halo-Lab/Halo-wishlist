import React, { MouseEventHandler } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import { IUser } from '../../models/IUser';
import { AppRootStateType } from '../../store/store';
import Image from '../common/ImageComponent/Image';
import { UserMenu } from './components/UserMenu/UserMenu';

import squaresSvg from '../../assets/svg/squares.svg';
import wishlyLogo from '../../assets/svg/wishly-logo.svg';

import styles from './MainLayout.module.scss';

const MainLayout: React.FC<IProps> = ({
  nameSh,
  userPicSh,
  birthdaySh,
  hideMenu = false,
  children,
  changeView,
  customTab,
  tabs,
  changeTab,
  activeTab,
  setLists,
  wishlistId,
}) => {
  const user = useSelector<AppRootStateType, IUser>((state) => state.users.user);

  const { name, userPic, date: birthday, isActivated } = user;
  const location = useLocation();

  const { t } = useTranslation();

  return (
    <main className={styles.container}>
      <div className={styles.header}>
        <Link to="/">
          <Image alt="wishlyLogo" src={wishlyLogo} width={125} height={37} />
        </Link>
        {!hideMenu && (
          <UserMenu
            userPic={userPicSh || userPic}
            setLists={setLists}
            wishlistId={wishlistId}
          />
        )}
      </div>
      <div className={styles.container__top}>
        <div className={styles.user}>
          <Image
            alt="user"
            src={userPicSh || userPic}
            userPlaceholder="true"
            width={80}
            height={80}
            circle
            className={styles.user__pic}
          />
          <p className={styles.user__name}>{name || nameSh}</p>
          <p>
            {birthday || birthday
              ? new Date().getFullYear() -
                new Date(birthdaySh || birthday).getFullYear()
              : 'always 18'}
            {` ${t('years')}`}
          </p>
          <p className={styles.confirm}>
            {isActivated &&
              location.pathname === '/' &&
              'Please, confirm your email!'}
          </p>
        </div>
      </div>
      <div className={styles.container__middle}>
        <div className={styles.tabs}>
          {customTab ||
            (tabs &&
              tabs.map((tab, index) => {
                return (
                  <span
                    key={tab}
                    onClick={() => changeTab && changeTab(index)}
                    className={activeTab == index ? styles.activeTab : styles.tab}
                  >
                    {tab}
                  </span>
                );
              }))}
        </div>
        {changeView && (
          <button className={styles.button} onClick={changeView}>
            <img className={styles.button__icon} src={squaresSvg} alt="icon" />
            <p>{t('changeView')}</p>
          </button>
        )}
      </div>
      {children}
    </main>
  );
};

interface IProps {
  changeView?: MouseEventHandler<HTMLButtonElement>;
  tabs?: string[];
  activeTab?: number;
  nameSh?: string;
  userPicSh?: string;
  birthdaySh?: string;
  hideMenu?: boolean | string;
  customTab?: React.ReactNode;
  setLists?: (value: any) => void;
  wishlistId?: string;
  changeTab?: (value: number) => void;
}

export { MainLayout };
