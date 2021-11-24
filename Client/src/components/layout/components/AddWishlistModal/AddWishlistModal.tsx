import { Form, Formik } from 'formik';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

import { addWishlist } from '../../../../store/wishlist-reducer';
import { ButtonService } from '../../../common/ButtonSendForm/ButtonSendForm';
import { FormikTextInput } from '../../../common/FormikInput/FormikInput';
import { Modal } from '../../../common/Modal/Modal';

import styles from './AddWishlistModal.module.scss';

const AddWishlistModal: React.FC<IProps> = ({ isModal, setIsModal }) => {
  const dispatch = useDispatch();

  const Schema = Yup.object().shape({
    name: Yup.string()
      .min(4, 'Min length 4 symbol')
      .max(50, 'Max length 50 symbol')
      .required('Required!'),
  });

  const handleSubmitForm = (values) => {
    dispatch(addWishlist(values.name));
    setIsModal(false);
  };

  return (
    <Modal isOpen={isModal} setIsOpen={setIsModal}>
      <div className={styles.modal_container}>
        <h3 className={styles.title}>Create new wishlist</h3>
        <Formik
          initialValues={{ name: '' }}
          validationSchema={Schema}
          onSubmit={handleSubmitForm}
        >
          {({ dirty }) => (
            <Form>
              <label>
                Name
                <FormikTextInput
                  type="text"
                  name="name"
                  placeholder="My birthday"
                  className={styles.input}
                />
              </label>
              <div className={styles.control}>
                <ButtonService
                  btnName="Cancel"
                  className={styles.btn_cancel}
                  handleClickButton={() => setIsModal(false)}
                />
                <ButtonService
                  btnName="Save"
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

export { AddWishlistModal };
