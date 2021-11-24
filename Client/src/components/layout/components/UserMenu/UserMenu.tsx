import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ButtonService } from '../../../common/ButtonSendForm/ButtonSendForm';
import Image from '../../../common/ImageComponent/Image';
import { AddWishlistModal } from '../AddWishlistModal/AddWishlistModal';
import { Nav } from '../Nav/Nav';

import add_icon from '../../../../assets/svg/addButton.svg';
import arrow_icon from '../../../../assets/svg/arrow.svg';

import styles from './UserMenu.module.scss';

const UserMenu: React.FC<IProps> = ({ userPic }) => {
  const [isNav, setIsNav] = useState<boolean>(false);
  const [isModal, setIsModal] = useState<boolean>(false);
  const { t } = useTranslation();

  const toggleNav = () => setIsNav((prev) => !prev);

  const closeMenu = (event: Event) => {
    event.preventDefault();
    setIsNav(false);
  };

  return (
    <div className={styles.menu_container}>
      {isModal && <AddWishlistModal isModal={isModal} setIsModal={setIsModal} />}

      <ButtonService
        btnName={t('new')}
        height="32px"
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
      {isNav && <Nav closeToggle={closeMenu} />}
    </div>
  );
};

interface IProps {
  userPic: string;
}

export { UserMenu };
