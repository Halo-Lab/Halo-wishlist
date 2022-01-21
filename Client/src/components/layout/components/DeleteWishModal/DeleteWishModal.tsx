import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { IProduct } from '../../../../models/IProduct';
import { deleteWish } from '../../../../store/wishlist-reducer';
import { ButtonService } from '../../../common/ButtonSendForm/ButtonSendForm';
import { Modal } from '../../../common/Modal/Modal';

import styles from '../../../common/Modal/Modal.module.scss';

const DeleteWishModal: React.FC<IProps> = ({ isModal, setIsModal, data }) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const { listId } = useParams<{ listId: string }>();
  const onDeleteWish = (wishId: string) => {
    dispatch(deleteWish(listId, wishId));
    setIsModal(false);
  };

  return (
    <Modal isOpen={isModal === 'delete' ? true : false} setIsOpen={setIsModal}>
      <div className={styles.modal_container}>
        <h3 className={styles.title}>{t('modal.deleteWish')}</h3>
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

interface IProps {
  isModal: boolean | string;
  setIsModal: (value: boolean) => void;
  data: IProduct;
}

export { DeleteWishModal };
