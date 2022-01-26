import { MouseEventHandler, useState } from 'react';
import { useDetectClickOutside } from 'react-detect-click-outside';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';

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

type CreateMenuType = {
  name: string;
  id: number;
  image: string;
  toggleModal: MouseEventHandler<HTMLParagraphElement>;
};

const UserMenu: React.FC<IProps> = ({ userPic, wishlistId }) => {
  const [isNav, setIsNav] = useState<boolean>(false);
  const [isOpenModal, setIsOpenModal] = useState<boolean | string>('');
  const [visible, setVisible] = useState(false);
  const { userNickname } = useParams<{ userNickname: string }>();

  const { t } = useTranslation();

  const toggleNav = () => setIsNav((prev) => !prev);

  const closeMenu = () => {
    setIsNav(false);
  };

  const createMenu: Array<CreateMenuType> = [
    {
      name: t('wishlist'),
      id: 0,
      image: add_wishlist_icon,
      toggleModal() {
        setIsOpenModal('wishlist');
      },
    },
    {
      name: t('addWish'),
      id: 1,
      image: add_wish_icon,
      toggleModal() {
        setIsOpenModal('addWish');
      },
    },
  ];

  const handleVisible = () => {
    setVisible(false);
  };

  const ref = useDetectClickOutside({ onTriggered: handleVisible });
  const navRef = useDetectClickOutside({ onTriggered: closeMenu });

  return (
    <div className={styles.menu_container}>
      <AddWishlistModal isModal={isOpenModal} setIsModal={setIsOpenModal} />
      <AddEditWishModal
        isModal={isOpenModal}
        setIsModal={setIsOpenModal}
        wishlistId={wishlistId}
      />

      {!userNickname && (
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
      )}
      <div className={styles.menu_toggle} onClick={toggleNav} ref={navRef}>
        <Image
          alt="user"
          userPlaceholder="true"
          src={userPic}
          width={50}
          height={50}
          circle
          className={styles.userPic}
        />
        <img src={arrow_icon} alt="menu-arrow" />
      </div>
      <Nav isShow={isNav} />
    </div>
  );
};

interface IProps {
  userPic: string;
  setLists?: (value: any) => void;
  wishlistId?: string;
}

export { UserMenu };
