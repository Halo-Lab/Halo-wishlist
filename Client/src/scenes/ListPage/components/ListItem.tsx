import { faCog } from '@fortawesome/free-solid-svg-icons';
import cn from 'classnames';
import { FC, MouseEventHandler, useState } from 'react';
import { useDetectClickOutside } from 'react-detect-click-outside';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import Icon from '../../../components/common/IconComponent/Icon';
import { SettingsMenu } from '../../../components/common/SettingsMenu';
import { AddEditWishModal } from '../../../components/layout/components/AddEditWishModal/AddEditWishModal';
import { DeleteWishModal } from '../../../components/layout/components/DeleteWishModal/DeleteWishModal';
import { IProduct } from '../../../models/IProduct';

import logo from '../../../assets/svg/wishyou-logo.svg';

import styles from './ListItem.module.scss';

type ISettings = {
  name: string;
  id: number;
  toggleModal: MouseEventHandler<HTMLParagraphElement>;
};

type IProps = {
  data: IProduct;
  setLists?: (value: any) => void;
  sharedPage?: string | boolean;
};

export const ListItem: FC<IProps> = ({ data, sharedPage = false }) => {
  const [visible, setVisible] = useState(false);
  const [isEditModal, setIsEditModal] = useState<boolean>(false);
  const [isDeleteModal, setIsDeleteModal] = useState<boolean>(false);
  const { userNickname } = useParams<{ userNickname: string }>();

  const { image, nameURL, price, url } = data;
  const { t } = useTranslation();

  const settingsList: Array<ISettings> = [
    {
      name: t('edit'),
      id: 1,
      toggleModal() {
        setIsEditModal((prev) => !prev);
      },
    },
    {
      name: t('delete'),
      id: 2,
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
      {isEditModal && (
        <AddEditWishModal
          isModal={isEditModal}
          setIsModal={setIsEditModal}
          data={data}
        />
      )}
      {isDeleteModal && (
        <DeleteWishModal
          isModal={isDeleteModal}
          setIsModal={setIsDeleteModal}
          data={data}
        />
      )}
      <div className={styles.content}>
        {!sharedPage && !userNickname && (
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
              <p
                data-title={
                  price.trim().length > 8
                    ? price.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')
                    : 'none'
                }
              >
                {price
                  .trim()
                  .slice(0, 8)
                  .replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ') +
                  (price.trim().length > 8 ? '...' : '')}
              </p>
            </div>
            <div>
              <a href={url} target="_blank">
                {t('present')}
              </a>
            </div>
          </div>
        ) : (
          <div className={styles.info}>
            <p>{nameURL.slice(0, 33) + (nameURL.length > 33 ? '...' : '')}</p>
            <a
              href={url}
              target="_blank"
              data-title={
                price.trim().length > 8
                  ? price.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')
                  : 'none'
              }
            >
              {price
                .trim()
                .slice(0, 8)
                .replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ') +
                (price.trim().length > 8 ? '...' : '')}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
