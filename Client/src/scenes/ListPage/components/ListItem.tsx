import { faCog } from '@fortawesome/free-solid-svg-icons';
import cn from 'classnames';
import { FC, MouseEventHandler, useState } from 'react';
import { useDetectClickOutside } from 'react-detect-click-outside';

// import { useTranslation } from 'react-i18next';
import Icon from '../../../components/common/IconComponent/Icon';
import { SettingsMenu } from '../../../components/common/SettingsMenu';
import { DeleteWishModal } from '../../../components/layout/components/DeleteWishModal/DeleteWishModal';
import { EditWishModal } from '../../../components/layout/components/EditWishModal/EditWishModal';
import { ShareWishlistModal } from '../../../components/layout/components/ShareWishlistModal/ShareWishlistModal';
import { IProduct } from '../../../models/IProduct';

import logo from '../../../assets/svg/wishly-logo.svg';

import styles from './ListItem.module.scss';

type ISettings = {
  name: string;
  id: number;
  toggleModal: MouseEventHandler<HTMLParagraphElement>;
};

type IProps = {
  data: IProduct;
  sharedPage?: boolean | string;
};

export const ListItem: FC<IProps> = ({ data, setLists, sharedPage = false }) => {
  const [visible, setVisible] = useState(false);
  const [isShareModal, setIsShareModal] = useState<boolean>(false);
  const [isEditModal, setIsEditModal] = useState<boolean>(false);
  const [isDeleteModal, setIsDeleteModal] = useState<boolean>(false);

  const { image, nameURL, price, url } = data;

  // const { t } = useTranslation();

  const settingsList: Array<ISettings> = [
    {
      name: 'Share',
      id: 0,
      toggleModal() {
        setIsShareModal((prev) => !prev);
      },
    },
    {
      name: 'Edit',
      id: 1,
      toggleModal() {
        setIsEditModal((prev) => !prev);
      },
    },
    {
      name: 'Archive',
      id: 2,
      toggleModal() {
        setIsShareModal((prev) => !prev);
      },
    },
    {
      name: 'Delete',
      id: 3,
      toggleModal() {
        setIsDeleteModal((prev) => !prev);
      },
    },
  ];

  const handleVisible = () => {
    setVisible(false);
  };

  const ref = useDetectClickOutside({ onTriggered: handleVisible });

  return (
    <div className={styles.square}>
      {isShareModal && (
        <ShareWishlistModal isModal={isShareModal} setIsModal={setIsShareModal} />
      )}
      {isEditModal && (
        <EditWishModal
          isModal={isEditModal}
          setIsModal={setIsEditModal}
          data={data}
          setLists={setLists}
        />
      )}
      {isDeleteModal && (
        <DeleteWishModal
          isModal={isDeleteModal}
          setIsModal={setIsDeleteModal}
          data={data}
          setLists={setLists}
        />
      )}
      <div className={styles.content}>
        {!sharedPage && (
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
                <p className={styles.menuItems} key={item.id}>
                  {item.name}
                </p>
              ))}
            </SettingsMenu>
          </div>
        )}
        <img
          className={styles.img}
          src={image?.length <= 0 ? logo : image}
          alt="card background"
        />
        {sharedPage ? (
          <div className={styles.sharedPage}>
            <div>
              <p>{nameURL.slice(0, 20) + '...'}</p>
              <p>{price.trim()}</p>
            </div>
            <div>
              <a href={url} target="_blank">
                Present
              </a>
            </div>
          </div>
        ) : (
          <div className={styles.info}>
            <p>{nameURL.slice(0, 33) + '...'}</p>
            <a href={url} target="_blank">
              {price.trim()}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
