import { MouseEventHandler } from 'react';
import { useSelector } from 'react-redux';

import { IUser } from '../../models/IUser';
import { AppRootStateType } from '../../store/store';
import Image from '../common/ImageComponent/Image';

import squaresSvg from '../../assets/svg/squares.svg';
import wishlyLogo from '../../assets/svg/wishly-logo.svg';

import styles from './MainLayout.module.scss';

const MainLayout: React.FC<IProps> = ({
  children,
  changeView,
  tabs,
  changeTab,
  activeTab,
}) => {
  const user = useSelector<AppRootStateType, IUser>((state) => state.users.user);
  const { name, userPic, date: birthday } = user;

  return (
    <main className={styles.container}>
      <div className={styles.header}>
        <Image alt="wishlyLogo" src={wishlyLogo} width={125} height={37} />
      </div>
      <div className={styles.container__top}>
        <div className={styles.user}>
          <img className={styles.user__pic} src={userPic} alt="user" />
          <p className={styles.user__name}>{name}</p>
          <p>
            {new Date().getFullYear() - new Date(birthday).getFullYear()}
            {` years old`}
          </p>
        </div>
      </div>
      <div className={styles.container__middle}>
        <div className={styles.tabs}>
          {tabs &&
            tabs.map((t, index) => {
              return (
                <span
                  key={t}
                  onClick={() => changeTab && changeTab(index)}
                  className={activeTab == index ? styles.activeTab : styles.tab}
                >
                  {t}
                </span>
              );
            })}
        </div>
        {changeView && (
          <button className={styles.button} onClick={changeView}>
            <img className={styles.button__icon} src={squaresSvg} alt="icon" />
            <p>Change view</p>
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
}

export { MainLayout };
