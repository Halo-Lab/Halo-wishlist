import React, { MouseEventHandler } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import { IUser } from '../../models/IUser';
import { AppRootStateType } from '../../store/store';
import { ChangeLanguage } from '../common/ChangeLanguage';
import Image from '../common/ImageComponent/Image';
import { UserMenu } from './components/UserMenu/UserMenu';

import squaresSvg from '../../assets/svg/squares.svg';
import logo from '../../assets/svg/wishyou-logo.svg';

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
  changeLang = false,
}) => {
  const user = useSelector<AppRootStateType, IUser>((state) => state.users.user);

  const { name, userPic, date: birthday, isActivated } = user;
  const location = useLocation();
  const isShared = location.pathname.startsWith('/shared');

  const { t } = useTranslation();

  const getFullAge = (date) => {
    return date
      ? new Date().getFullYear() - new Date(date).getFullYear()
      : t('foreverYang');
  };

  return (
    <main className={styles.container}>
      <div className={styles.header}>
        <Link to="/">
          <Image alt="wishyou logo" src={logo} width={150} height={37} />
        </Link>
        {!hideMenu && (
          <UserMenu userPic={userPic} setLists={setLists} wishlistId={wishlistId} />
        )}
        {changeLang && <ChangeLanguage />}
      </div>
      <div className={styles.container__top}>
        <div className={styles.user}>
          <Image
            alt="user"
            src={isShared ? userPicSh : userPic}
            userPlaceholder="true"
            width={80}
            height={80}
            circle
            className={styles.user__pic}
          />
          <p className={styles.user__name}>{isShared ? nameSh : name}</p>
          {isShared && (
            <p>
              {getFullAge(birthdaySh)}
              {` ${t('years')}`}
            </p>
          )}
          {!isShared && (
            <p>
              {getFullAge(birthday)}
              {` ${t('years')}`}
            </p>
          )}
          <p className={styles.confirm}>
            {!isActivated &&
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
  changeLang?: boolean | string;
  customTab?: React.ReactNode;
  setLists?: (value: any) => void;
  wishlistId?: string;
  changeTab?: (value: number) => void;
}

export { MainLayout };
