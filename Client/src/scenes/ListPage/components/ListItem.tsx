import { faCog } from '@fortawesome/free-solid-svg-icons';
import cn from 'classnames';
import { FC, MouseEventHandler, useState } from 'react';
import { useDetectClickOutside } from 'react-detect-click-outside';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import WishlistRequest from '../../../api/request/WishlistRequest';
import { ButtonService } from '../../../components/common/ButtonSendForm/ButtonSendForm';
import Icon from '../../../components/common/IconComponent/Icon';
import { SettingsMenu } from '../../../components/common/SettingsMenu';
import { AddEditWishModal } from '../../../components/layout/components/AddEditWishModal/AddEditWishModal';
import { DeleteWishModal } from '../../../components/layout/components/DeleteWishModal/DeleteWishModal';
import { IProduct } from '../../../models/IProduct';
import { IWishlist } from '../../../models/IWishlist';
import { AppRootStateType } from '../../../store/store';
import { updateWish } from '../../../store/wishlist-reducer';
import * as notify from '../../../utils/notifications/index';

import logo from '../../../assets/svg/wishyou-logo.svg';

import styles from './ListItem.module.scss';

type ISettings = {
  name: string;
  id: number;
  toggleModal?: MouseEventHandler<HTMLParagraphElement>;
};

type IProps = {
  data: IProduct;
  setLists?: (value: any) => void;
  sharedPage?: string | boolean;
};

export const ListItem: FC<IProps> = ({ data, sharedPage = false, setLists }) => {
  const [visible, setVisible] = useState(false);
  const [isEditModal, setIsEditModal] = useState<boolean>(false);
  const [isDeleteModal, setIsDeleteModal] = useState<boolean>(false);
  const { userNickname } = useParams<{ userNickname: string }>();
  const userId = useSelector<AppRootStateType, string>(
    (state) => state.users.user.id,
  );
  const dispatch = useDispatch();
  const { listId } = useParams<{ listId: string }>();

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
    {
      name: t('gotIt'),
      id: 3,
      toggleModal() {
        dispatch(
          updateWish(listId, { ...data, gotIt: !data.gotIt, isReserved: '' }, true),
        );
      },
    },
  ];

  const handleVisible = () => {
    setVisible(false);
  };
  const ref = useDetectClickOutside({ onTriggered: handleVisible });
  const isReserved = data.isReserved;
  const myReserved = data.isReserved === userId;

  const onReservedWish = () => {
    const isReserved = data.isReserved ? '' : userId;
    if (setLists) {
      WishlistRequest.updateWish({
        _id: data._id,
        isReserved,
      })
        .then(() => {
          setLists((prev: IWishlist) => {
            const wishIndex = prev.items.findIndex((i) => {
              return i._id === data._id;
            });
            if (wishIndex > -1) {
              const newState = { ...prev, items: [...prev.items] };
              newState.items[wishIndex].isReserved = isReserved;
              return {
                ...newState,
              };
            }
          });
        })
        .catch((e) => {
          notify.error(e);
        });
    }
  };

  return (
    <div className={styles.square}>
      <AddEditWishModal
        isModal={isEditModal}
        setIsModal={setIsEditModal}
        data={data}
      />
      <DeleteWishModal
        isModal={isDeleteModal}
        setIsModal={setIsDeleteModal}
        data={data}
      />
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
        <div
          className={cn(styles.status, {
            [styles.visible]: data.gotIt || isReserved,
          })}
        >
          {isReserved && <div className={styles.reserved}>{t('reserved')}</div>}
          {data.gotIt && <div className={styles.gotIt}>{t('gotIt')}</div>}
        </div>
        {sharedPage ? (
          <div className={styles.sharedPage}>
            <a href={url} target="_blank">
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
            </a>
            {data.gotIt ? (
              ''
            ) : myReserved ? (
              <ButtonService
                className={styles.btn_reserved}
                handleClickButton={onReservedWish}
                btnName={isReserved ? t('remove') : t('present')}
              />
            ) : !isReserved ? (
              <ButtonService
                className={styles.btn_reserved}
                handleClickButton={onReservedWish}
                btnName={isReserved ? t('remove') : t('present')}
              />
            ) : (
              ''
            )}
          </div>
        ) : (
          <div className={styles.info}>
            <a
              href={url}
              target="_blank"
              data-title={
                price.trim().length > 8
                  ? price.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')
                  : 'none'
              }
            >
              <p>{nameURL.slice(0, 33) + (nameURL.length > 33 ? '...' : '')}</p>
              <p>
                {price
                  .trim()
                  .slice(0, 8)
                  .replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ') +
                  (price.trim().length > 8 ? '...' : '')}
              </p>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
