import React, { MouseEventHandler } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { IUser } from '../../models/IUser';
import { AppRootStateType } from '../../store/store';
import Image from '../common/ImageComponent/Image';
import { UserMenu } from './components/UserMenu/UserMenu';

import squaresSvg from '../../assets/svg/squares.svg';
import wishlyLogo from '../../assets/svg/wishly-logo.svg';

import styles from './MainLayout.module.scss';

const MainLayout: React.FC<IProps> = ({
  children,
  changeView,
  customTab,
  tabs,
  changeTab,
  activeTab,
}) => {
  const user = useSelector<AppRootStateType, IUser>((state) => state.users.user);
  const { name, userPic, date: birthday } = user;

  const { t } = useTranslation();

  return (
    <main className={styles.container}>
      <div className={styles.header}>
        <Link to="/">
          <Image alt="wishlyLogo" src={wishlyLogo} width={125} height={37} />
        </Link>
        <UserMenu userPic={userPic} />
      </div>
      <div className={styles.container__top}>
        <div className={styles.user}>
          <Image
            alt="user"
            src={userPic}
            width={80}
            height={80}
            circle
            className={styles.user__pic}
          />
          <p className={styles.user__name}>{name}</p>
          <p>
            {new Date().getFullYear() - new Date(birthday).getFullYear()}
            {` ${t('years')}`}
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
  changeTab?: (value: number) => void;
  customTab?: React.ReactNode;
}

export { MainLayout };
