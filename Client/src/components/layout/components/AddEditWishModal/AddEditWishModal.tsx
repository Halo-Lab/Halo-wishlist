import { Form, Formik } from 'formik';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

import WishlistRequest from '../../../../api/request/WishlistRequest';
import { IProduct } from '../../../../models/IProduct';
import { IWishlist } from '../../../../models/IWishlist';
import { AppRootStateType } from '../../../../store/store';
import { setWishlists } from '../../../../store/wishlist-reducer';
import * as notify from '../../../../utils/notifications';
import { ButtonService } from '../../../common/ButtonSendForm/ButtonSendForm';
import { FormikTextInput } from '../../../common/FormikInput/FormikInput';
import { Modal } from '../../../common/Modal/Modal';
import { Select } from '../../../common/Select/Select';

import styles from '../../../common/Modal/Modal.module.scss';

const AddEditWishModal: React.FC<IProps> = ({
  isModal,
  setIsModal,
  data,
  setLists,
  wishlistId,
}) => {
  const { t } = useTranslation();
  const Schema = Yup.object().shape({
    nameURL: Yup.string().required(t('errors.required')),
    price: Yup.string().nullable().required(t('errors.required')),
    url: Yup.string().url(t('errors.url')).required(t('errors.required')),
    image: Yup.string().url(t('errors.url')),
  });

  const userId = useSelector<AppRootStateType, string>(
    (state) => state.users.user.id,
  );
  const wishlists = useSelector<AppRootStateType, IWishlist[]>(
    (state) => state.wishlist.wishlists,
  );

  const [id, setId] = useState<string>(wishlists[0]._id || '');
  const dispatch = useDispatch();

  const addWish = (values) => {
    WishlistRequest.addWish(
      wishlistId || id,
      values.url,
      values.nameURL,
      values.image,
      values.price,
    )
      .then(() => {
        if (setLists) {
          setLists((prev) => {
            const newState = {
              ...prev,
              items: [...prev.items, { ...values }],
            };
            return {
              ...newState,
            };
          });
        }
        dispatch(setWishlists(userId));
      })
      .then(() => {
        notify.successes(t('modal.created'));
      })
      .catch((e) => {
        notify.error(e.response.data.message);
      });
  };

  const updateWish = (values) => {
    if (setLists) {
      WishlistRequest.updateWish(
        values._id,
        values.url,
        values.nameURL,
        values.image,
        values.price,
      )
        .then(() => {
          setLists((prev) => {
            const index = prev.items.findIndex((wish) => wish._id === values._id);
            const newState = { ...prev, items: [...prev.items] };
            newState.items[index] = values;
            return {
              ...newState,
            };
          });
        })
        .then(() => notify.successes(t('modal.edited')))
        .catch((e) => {
          notify.error(e);
        });
    }
  };

  const handleSubmitForm = (values) => {
    if (data) {
      updateWish(values);
    } else {
      addWish(values);
    }
    setIsModal(false);
  };

  const choseWishlist = (event) => {
    setId(event.target.value);
  };

  return (
    <Modal isOpen={isModal} setIsOpen={setIsModal}>
      <div className={styles.modal_container}>
        <h3 className={styles.title}>
          {data ? t('modal.editWish') : t('modal.createWish')}
        </h3>
        <Formik
          initialValues={
            data
              ? { ...data }
              : { _id: id, nameURL: '', url: '', image: '', price: '' }
          }
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
              <label>
                {t('modal.image')}
                <FormikTextInput
                  type="text"
                  name="image"
                  placeholder="https://wish.com/image.png"
                  className={styles.input}
                />
              </label>
              {!wishlistId && !data && (
                <Select
                  selectName="categories"
                  className="select"
                  items={wishlists}
                  onChange={choseWishlist}
                />
              )}
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
  data?: IProduct;
  setLists?: (value: any) => void | undefined;
  wishlistId?: string;
}

export { AddEditWishModal };
