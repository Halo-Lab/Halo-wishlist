import { MouseEventHandler, useState } from 'react';
import { useDetectClickOutside } from 'react-detect-click-outside';
import { useTranslation } from 'react-i18next';

import { ButtonService } from '../../../common/ButtonSendForm/ButtonSendForm';
import Image from '../../../common/ImageComponent/Image';
import { SettingsMenu } from '../../../common/SettingsMenu';
import { AddEditWishModal } from '../AddEditWishModal/AddEditWishModal';
import { AddWishlistModal } from '../AddWishlistModal/AddWishlistModal';
import { Nav } from '../Nav/Nav';

import add_icon from '../../../../assets/svg/addButton.svg';
import arrow_icon from '../../../../assets/svg/arrow.svg';
import add_wish_icon from '../../../../assets/svg/box.svg';
import add_wishlist_icon from '../../../../assets/svg/folder-plus.svg';

import styles from './UserMenu.module.scss';

type ICreateMenu = {
  name: string;
  id: number;
  image: string;
  toggleModal: MouseEventHandler<HTMLParagraphElement>;
};

const UserMenu: React.FC<IProps> = ({ userPic, setLists, wishlistId }) => {
  const [isNav, setIsNav] = useState<boolean>(false);
  const [isAddWishlistModal, setAddWishlistIsModal] = useState<boolean>(false);
  const [isAddWishModal, setAddWishIsModal] = useState<boolean>(false);
  const [visible, setVisible] = useState(false);
  const { t } = useTranslation();

  const toggleNav = () => setIsNav((prev) => !prev);

  const closeMenu = (event: Event) => {
    event.preventDefault();
    setIsNav(false);
  };

  const createMenu: Array<ICreateMenu> = [
    {
      name: t('wishlist'),
      id: 0,
      image: add_wishlist_icon,
      toggleModal() {
        setAddWishlistIsModal((prev) => !prev);
      },
    },
    {
      name: t('addWish'),
      id: 1,
      image: add_wish_icon,
      toggleModal() {
        setAddWishIsModal((prev) => !prev);
      },
    },
  ];

  const handleVisible = () => {
    setVisible(false);
  };

  const ref = useDetectClickOutside({ onTriggered: handleVisible });

  return (
    <div className={styles.menu_container}>
      {isAddWishlistModal && (
        <AddWishlistModal
          isModal={isAddWishlistModal}
          setIsModal={setAddWishlistIsModal}
        />
      )}
      {isAddWishModal && setLists && (
        <AddEditWishModal
          isModal={isAddWishModal}
          setIsModal={setAddWishIsModal}
          setLists={setLists}
          wishlistId={wishlistId}
        />
      )}

      <div className={styles.iconWrapper} ref={ref}>
        <ButtonService
          btnName={t('new')}
          className={styles.addButton}
          handleClickButton={() => setVisible(true)}
        >
          <img src={add_icon} alt="menu-arrow" className={styles.icon} />
        </ButtonService>

        <SettingsMenu open={visible} className={styles.menuPosition}>
          {createMenu.map((item) => (
            <div key={item.id} className={styles.menuItems}>
              <img src={item.image} alt={item.name} />
              <p onClick={item.toggleModal}>{item.name}</p>
            </div>
          ))}
        </SettingsMenu>
      </div>
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
  setLists?: (value: any) => void;
  wishlistId?: string;
}

export { UserMenu };
