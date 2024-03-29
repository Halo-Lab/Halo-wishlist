import { faCog } from '@fortawesome/free-solid-svg-icons';
import cn from 'classnames';
import { MouseEventHandler, useState } from 'react';
import { useDetectClickOutside } from 'react-detect-click-outside';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';

import Icon from '../../../../components/common/IconComponent/Icon';
import { SettingsMenu } from '../../../../components/common/SettingsMenu';
import { DeleteWishlistModal } from '../../../../components/layout/components/DeleteWishlistModal/DeleteWishlistModal';
import { ShareWishlistModal } from '../../../../components/layout/components/ShareWishlistModal/ShareWishlistModal';
import { IWishlist } from '../../../../models/IWishlist';

import wishlistImg from '../../../../assets/png/wishlist.png';

import styles from './WishlistCard.module.scss';

type ISettings = {
  name: string;
  id: number;
  toggleModal: MouseEventHandler<HTMLParagraphElement>;
};

const WishlistCard: React.FC<IProps> = ({ data }) => {
  const [visible, setVisible] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState<boolean | string>('');

  const { name, items } = data;
  const history = useHistory();
  const { t } = useTranslation();

  const settingsList: Array<ISettings> = [
    {
      name: t('share'),
      id: 0,
      toggleModal() {
        setIsOpenModal('share');
      },
    },
    {
      name: t('delete'),
      id: 3,
      toggleModal() {
        setIsOpenModal('delete');
      },
    },
  ];

  const handleVisible = () => {
    setVisible(false);
  };

  const ref = useDetectClickOutside({ onTriggered: handleVisible });

  return (
    <>
      <ShareWishlistModal
        isModal={isOpenModal}
        setIsModal={setIsOpenModal}
        wishlistId={data._id}
      />
      <DeleteWishlistModal
        isModal={isOpenModal}
        setIsModal={setIsOpenModal}
        wishlistId={data._id}
      />
      <div className={styles.square}>
        <div className={styles.content}>
          <div
            className={styles.iconWrapper}
            ref={ref}
            onClick={() => setVisible(!visible)}
          >
            <Icon
              size="lg"
              name={faCog}
              className={cn(styles.iconStyle, { [styles.rotate]: visible })}
            />
            <SettingsMenu open={visible} className={styles.menuPosition}>
              {settingsList.map((item) => (
                <p
                  className={styles.menuItems}
                  key={item.id}
                  onClick={item.toggleModal}
                >
                  {item.name}
                </p>
              ))}
            </SettingsMenu>
          </div>
          <img
            className={styles.img}
            src={wishlistImg}
            alt="card background"
            onClick={() => history.push(`/wishlists/${data._id}`)}
          />
          <div className={styles.info}>
            <div className={styles.name}>{name}</div>
            <div className={styles.count}> {`${t('items')} ${items.length}`}</div>
          </div>
        </div>
      </div>
    </>
  );
};

interface IProps {
  data: IWishlist;
}

export { WishlistCard };
