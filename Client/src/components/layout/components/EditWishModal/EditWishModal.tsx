import { Form, Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

import WishlistRequest from '../../../../api/request/WishlistRequest';
import { IProduct } from '../../../../models/IProduct';
import * as notify from '../../../../utils/notifications';
import { ButtonService } from '../../../common/ButtonSendForm/ButtonSendForm';
import { FormikTextInput } from '../../../common/FormikInput/FormikInput';
import { Modal } from '../../../common/Modal/Modal';

import styles from '../../../common/Modal/Modal.module.scss';

const EditWishModal: React.FC<IProps> = ({
  isModal,
  setIsModal,
  data,
  setLists,
}) => {
  const { t } = useTranslation();

  const Schema = Yup.object().shape({
    nameURL: Yup.string().required(t('errors.required')),
    price: Yup.string().nullable().required(t('errors.required')),
    url: Yup.string().url(t('errors.url')).required(t('errors.required')),
  });

  const handleSubmitForm = (values) => {
    setLists((prev) => {
      const index = prev.items.findIndex((wish) => wish._id === values._id);
      const newState = { ...prev, items: [...prev.items] };
      newState.items[index] = values;
      WishlistRequest.updateWish(
        values._id,
        values.url,
        values.nameURL,
        values.image,
        values.price,
      )
        .then(() => notify.successes(t('modal.edited')))
        .catch((e) => {
          notify.error(e);
        });
      return {
        ...newState,
      };
    });
    setIsModal(false);
  };

  return (
    <Modal isOpen={isModal} setIsOpen={setIsModal}>
      <div className={styles.modal_container}>
        <h3 className={styles.title}>{t('modal.editWish')}</h3>
        <Formik
          initialValues={{ ...data }}
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
                      name="nameURL"
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
                  <span className={styles.price}></span>
                </div>
              </div>
              <label>
                {t('modal.link')}
                <FormikTextInput
                  type="text"
                  name="url"
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
  data: IProduct;
  setLists: (value: any) => void;
}

export { EditWishModal };
