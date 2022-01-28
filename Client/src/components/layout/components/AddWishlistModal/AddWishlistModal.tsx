import { Form, Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

import { addWishlist } from '../../../../store/wishlist-reducer';
import { ButtonService } from '../../../common/ButtonSendForm/ButtonSendForm';
import { FormikTextInput } from '../../../common/FormikInput/FormikInput';
import { Modal } from '../../../common/Modal/Modal';

import styles from '../../../common/Modal/Modal.module.scss';

const AddWishlistModal: React.FC<IProps> = ({ isModal, setIsModal }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const Schema = Yup.object().shape({
    name: Yup.string()
      .max(50, t('modal.max50Length'))
      .required(t('errors.required')),
  });

  const handleSubmitForm = (values) => {
    dispatch(addWishlist(values.name));
    setIsModal(false);
  };

  return (
    <Modal isOpen={isModal === 'wishlist'} setIsOpen={setIsModal}>
      <div className={styles.modal_container}>
        <h3 className={styles.title}>{t('modal.createWishlist')}</h3>
        <Formik
          initialValues={{ name: '' }}
          validationSchema={Schema}
          onSubmit={handleSubmitForm}
        >
          {({ dirty }) => (
            <Form>
              <label>
                {t('modal.name')}
                <FormikTextInput
                  type="text"
                  name="name"
                  placeholder={t('modal.placeholder')}
                  className={styles.input}
                />
              </label>
              <div className={styles.control}>
                <ButtonService
                  btnName={t('modal.cancel')}
                  className={styles.btn_cancel}
                  handleClickButton={() => setIsModal(false)}
                />
                <ButtonService
                  btnName={t('modal.save')}
                  className={styles.btn_save}
                  disabled={!dirty}
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Modal>
  );
};

interface IProps {
  isModal: boolean | string;
  setIsModal: (value: boolean) => void;
}

export { AddWishlistModal };
