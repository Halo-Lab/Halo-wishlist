import { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { IProduct } from '../../../../models/IProduct';
import { AppRootStateType } from '../../../../store/store';
import { deleteWish, WishlistStateType } from '../../../../store/wishlist-reducer';
import { ButtonService } from '../../../common/ButtonSendForm/ButtonSendForm';
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
  const dispatch = useDispatch();
  const { listId } = useParams<{ listId: string }>();
  const onDeleteWish = (wishId: string) => {
    dispatch(deleteWish(listId, wishId));
    setIsModal(false);
  };

  return (
    <Modal isOpen={isModal} setIsOpen={setIsModal}>
      <div className={styles.modal_container}>
        <h3 className={styles.title}>{t('modal.restoreWish')}:</h3>
        <div className={styled.selectorCuret}>
          <label>Wishlists</label>
          <select
            name="select"
            defaultValue="value1"
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              console.log(e.target.value)
            }
          >
            {wishlists.map((item) => {
              return (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              );
            })}
          </select>
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
            handleClickButton={() => onDeleteWish(data._id)}
          />
        </div>
      </div>
    </Modal>
  );
};

export { RestoreWishModal };
