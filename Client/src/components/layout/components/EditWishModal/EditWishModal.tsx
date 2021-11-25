import { Form, Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

import { ButtonService } from '../../../common/ButtonSendForm/ButtonSendForm';
import { FormikTextInput } from '../../../common/FormikInput/FormikInput';
import { Modal } from '../../../common/Modal/Modal';

import styles from '../../../common/Modal/Modal.module.scss';

const EditWishModal: React.FC<IProps> = ({ isModal, setIsModal }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const Schema = Yup.object().shape({
    name: Yup.string()
      .min(4, t('errors.min4Length'))
      .max(50, t('errors.max50Length'))
      .required(t('errors.required')),
    price: Yup.string()
      .nullable()
      .max(10, t('errors.passwordMaxLength'))
      .required(t('errors.required')),
    link: Yup.string()
      .url(t('errors.url'))
      .max(50, t('errors.max50Length'))
      .required(t('errors.required')),
  });

  const handleSubmitForm = (values) => {
    console.log(values);
    setIsModal(false);
  };

  return (
    <Modal isOpen={isModal} setIsOpen={setIsModal}>
      <div className={styles.modal_container}>
        <h3 className={styles.title}>{t('modal.editWish')}</h3>
        <Formik
          initialValues={{ name: '', price: null, link: '' }}
          validationSchema={Schema}
          onSubmit={handleSubmitForm}
        >
          {({ dirty }) => (
            <Form>
              <div className={styles.row}>
                <div className={styles.input_name}>
                  <label>
                    {t('modal.name')}
                    <FormikTextInput
                      type="text"
                      name="name"
                      placeholder="Apple Iphone X"
                      className={styles.input}
                    />
                  </label>
                </div>
                <div className={styles.input_price}>
                  <label>
                    {t('modal.price')}
                    <FormikTextInput
                      type="string"
                      name="price"
                      placeholder="1200"
                      className={styles.input}
                    />
                  </label>
                  <span className={styles.price}>&nbsp;$</span>
                </div>
              </div>
              <label>
                {t('modal.link')}
                <FormikTextInput
                  type="text"
                  name="link"
                  placeholder="https://wish.com/darrell_steward/"
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
  isModal: boolean;
  setIsModal: (value: boolean) => void;
}

export { EditWishModal };
