import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { IProduct } from '../../../../models/IProduct';
import { archiveWish, deleteArchiveWish } from '../../../../store/wishlist-reducer';

import { ButtonService } from '../../../common/ButtonSendForm/ButtonSendForm';
import { Modal } from '../../../common/Modal/Modal';

import styles from '../../../common/Modal/Modal.module.scss';

const ArchiveWishModal: React.FC<IProps> = ({
  isModal,
  setIsModal,
  data,
  modal,
}) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const { listId } = useParams<{ listId: string }>();

  const onArchiveWish = () => {
    if (modal === 'delete') {
      dispatch(deleteArchiveWish(data._id));
    } else {
      dispatch(archiveWish(data, listId));
    }
    setIsModal(false);
  };

  return (
    <Modal isOpen={isModal} setIsOpen={setIsModal}>
      <div className={styles.modal_container}>
        <h3 className={styles.title}>{t('modal.archiveWish')}</h3>
        <div className={styles.control}>
          <ButtonService
            btnName={t('modal.no')}
            className={styles.btn_cancel}
            handleClickButton={() => setIsModal(false)}
          />
          <ButtonService
            btnName={t('modal.yes')}
            className={styles.btn_save}
            handleClickButton={onArchiveWish}
          />
        </div>
      </div>
    </Modal>
  );
};

interface IProps {
  isModal: boolean;
  setIsModal: (value: boolean) => void;
  data: IProduct;
  modal?: string;
}

export { ArchiveWishModal };
