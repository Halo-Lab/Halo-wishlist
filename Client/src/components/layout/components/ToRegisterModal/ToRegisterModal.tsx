import { useTranslation } from 'react-i18next';

import { Modal } from '../../../common/Modal/Modal';

import styles from '../../../common/Modal/Modal.module.scss';

const ToRegisterModal: React.FC<IProps> = ({ isModal, setIsModal }) => {
  const { t } = useTranslation();

  return (
    <Modal isOpen={isModal} setIsOpen={setIsModal}>
      <h3 className={styles.title}>{t('modal.createAccountTitle')}</h3>
      <div className={styles.control}>
        <a className={styles.btn_link} href={'/registration'} target="_blank">
          {t('modal.createAccount')}
        </a>
      </div>
    </Modal>
  );
};

interface IProps {
  isModal: boolean;
  setIsModal: (value: boolean) => void;
}

export { ToRegisterModal };
