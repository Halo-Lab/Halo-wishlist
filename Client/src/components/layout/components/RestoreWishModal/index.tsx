import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { IProduct } from '../../../../models/IProduct';
import { AppRootStateType } from '../../../../store/store';
import {
  restoreArchiveWishes,
  WishlistStateType,
} from '../../../../store/wishlist-reducer';
import { ButtonService } from '../../../common/ButtonSendForm/ButtonSendForm';
import { CustomSelect } from '../../../common/DropDownSelect/CustomSelect';
import { Modal } from '../../../common/Modal/Modal';

import styles from '../../../common/Modal/Modal.module.scss';
import styled from './RestoreWish.module.scss';

interface IProps {
  isModal: boolean;
  setIsModal: (value: boolean) => void;
  data: IProduct;
}

const RestoreWishModal: React.FC<IProps> = ({ isModal, setIsModal, data }) => {
  const { t } = useTranslation();
  const { wishlists } = useSelector<AppRootStateType, WishlistStateType>(
    (state) => state.wishlist,
  );
  const ref = useRef<string>(wishlists?.[0]?._id);

  const dispatch = useDispatch();

  const onRestoreWish = (wishId: string, wishlistId: string) => {
    dispatch(restoreArchiveWishes(wishId, wishlistId, data));
    setIsModal(false);
  };

  return (
    <Modal isOpen={isModal} setIsOpen={setIsModal}>
      <div className={styles.modal_container}>
        <h3 className={styles.title}>{t('modal.restoreWish')}:</h3>
        <div className={styled.selectorCuret}>
          <label>Wishlists</label>
          <CustomSelect
            className={styled.wrapperSelect}
            // selectedName={ref.current}
            options={wishlists.map((item) => {
              return { value: item._id, name: item.name };
            })}
            setSelected={(item) => {
              ref.current = item;
            }}
          />
        </div>
        <div className={styles.control}>
          <ButtonService
            btnName={t('modal.no')}
            className={styles.btn_cancel}
            handleClickButton={() => setIsModal(false)}
          />
          <ButtonService
            btnName={t('modal.yes')}
            className={styles.btn_save}
            handleClickButton={() => onRestoreWish(data._id, ref.current)}
          />
        </div>
      </div>
    </Modal>
  );
};

export { RestoreWishModal };
