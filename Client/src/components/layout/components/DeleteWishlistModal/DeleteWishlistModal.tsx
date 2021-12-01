import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { deleteWishlist } from '../../../../store/wishlist-reducer';
import { ButtonService } from '../../../common/ButtonSendForm/ButtonSendForm';
import { Modal } from '../../../common/Modal/Modal';

import styles from '../../../common/Modal/Modal.module.scss';

const DeleteWishlistModal: React.FC<IProps> = ({
  isModal,
  setIsModal,
  wishlistId,
}) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const deleteWish = () => {
    dispatch(deleteWishlist(wishlistId));
  };

  return (
    <Modal isOpen={isModal} setIsOpen={setIsModal}>
      <div className={styles.modal_container}>
        <h3 className={styles.title}>{t('modal.deleteWishlist')}</h3>
        <div className={styles.control}>
          <ButtonService
            btnName={t('modal.no')}
            className={styles.btn_cancel}
            handleClickButton={() => setIsModal(false)}
          />
          <ButtonService
            btnName={t('modal.yes')}
            className={styles.btn_save}
            handleClickButton={() => deleteWish()}
          />
        </div>
      </div>
    </Modal>
  );
};

interface IProps {
  isModal: boolean;
  setIsModal: (value: boolean) => void;
  wishlistId: string;
}

export { DeleteWishlistModal };
