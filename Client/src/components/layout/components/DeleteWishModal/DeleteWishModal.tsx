import { useTranslation } from 'react-i18next';

import WishlistRequest from '../../../../api/request/WishlistRequest';
import { IProduct } from '../../../../models/IProduct';
import * as notify from '../../../../utils/notifications';
import { ButtonService } from '../../../common/ButtonSendForm/ButtonSendForm';
import { Modal } from '../../../common/Modal/Modal';

import styles from '../../../common/Modal/Modal.module.scss';

const DeleteWishModal: React.FC<IProps> = ({
  isModal,
  setIsModal,
  data,
  setLists,
}) => {
  const { t } = useTranslation();

  const deleteWish = (data) => {
    WishlistRequest.deleteWish(data._id)
      .then(() => {
        setLists((prev) => {
          const newState = {
            ...prev,
            items: [...prev.items].filter((wish) => wish._id !== data._id),
          };
          return {
            ...newState,
          };
        });
      })
      .then(() => notify.successes(t('modal.deleted')))
      .catch((e) => {
        notify.error(e);
      });
    setIsModal(false);
  };

  return (
    <Modal isOpen={isModal} setIsOpen={setIsModal}>
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
            handleClickButton={() => deleteWish(data)}
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
  setLists: (value: any) => void;
}

export { DeleteWishModal };
