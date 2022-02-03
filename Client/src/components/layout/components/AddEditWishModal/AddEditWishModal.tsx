import { Form, Formik } from 'formik';
import { ChangeEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as Yup from 'yup';

import WishlistRequest from '../../../../api/request/WishlistRequest';
import { IProduct } from '../../../../models/IProduct';
import { IWishlist } from '../../../../models/IWishlist';
import { AppRootStateType } from '../../../../store/store';
import { addWish, updateWish } from '../../../../store/wishlist-reducer';
import { ButtonService } from '../../../common/ButtonSendForm/ButtonSendForm';
import { CustomSelect } from '../../../common/DropDownSelect/CustomSelect';
import { FormikTextInput } from '../../../common/FormikInput/FormikInput';
import { Modal } from '../../../common/Modal/Modal';

import styles from '../../../common/Modal/Modal.module.scss';
import styled from './AddEditWishModal.module.scss';

const AddEditWishModal: React.FC<IProps> = ({
  isModal,
  setIsModal,
  data,
  wishlistId,
}) => {
  const { t } = useTranslation();
  const Schema = Yup.object().shape({
    nameURL: Yup.string().required(t('errors.required')),
    price: Yup.string().nullable().required(t('errors.required')),
    url: Yup.string().url(t('errors.url')).required(t('errors.required')),
    image: Yup.string().url(t('errors.url')),
  });

  const SchemaParsedData = Yup.object().shape({
    nameURL: Yup.string().required(t('errors.required')),
    price: Yup.string().nullable().required(t('errors.required')),
    image: Yup.string().url(t('errors.url')),
  });

  const wishlists = useSelector<AppRootStateType, IWishlist[]>(
    (state) => state.wishlist.wishlists,
  );

  const { listId } = useParams<{ listId: string }>();

  const [id, setId] = useState<string>(wishlists[0]?._id || '');
  const dispatch = useDispatch();

  const onAddWish = (values) => {
    dispatch(
      addWish(
        wishlistId || id,
        values.url,
        values.nameURL,
        values.image,
        values.price,
      ),
    );
  };

  const onUpdateWish = (values) => {
    dispatch(updateWish(listId, values));
  };

  const handleSubmitForm = (values) => {
    if (data) {
      onUpdateWish(values);
    } else {
      setParsedData({
        nameURL: '',
        image: '',
        price: '',
      });
      onAddWish(values);
    }
    setIsModal(false);
  };

  const [parsedData, setParsedData] = useState({
    nameURL: '',
    image: '',
    price: '',
  });

  const parseUrl = (url) => {
    WishlistRequest.parseUrl(url).then((res) => {
      setParsedData({
        nameURL: res.data.nameURL,
        image: res.data.image,
        price: res.data.price,
      });
      setResStatus(true);
    });
  };

  const [resStatus, setResStatus] = useState(false);
  const [urlParse, setUrlParse] = useState('');
  const [error, setError] = useState<string | null>();

  const validateUrl = (value) => {
    return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(
      value,
    );
  };

  const addItemHandler = () => {
    if (urlParse.trim() !== '') {
      const isValidUrl = validateUrl(urlParse);
      if (!isValidUrl) {
        setError('Not valid url!');
      } else parseUrl(urlParse);
    } else {
      setError('Is required');
    }
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setUrlParse(e.currentTarget.value);
    setError(null);
  };

  useEffect(() => {
    if (!isModal) setResStatus(false);
  }, [isModal]);

  return (
    <Modal
      isOpen={isModal === 'edit' || isModal === 'addWish'}
      setIsOpen={setIsModal}
    >
      <div className={styles.modal_container}>
        <h3 className={styles.title}>
          {data ? t('modal.editWish') : t('modal.createWish')}
        </h3>

        {!data && (
          <div className={styles.row}>
            <label>
              {t('modal.link')}
              <input
                type="email"
                onChange={onChangeHandler}
                autoComplete="url"
                placeholder="https://wish.com/darrell_steward/"
                className={styles.input}
                disabled={resStatus}
              />
              <div className={styles.error}>{error}</div>
            </label>
            {!resStatus && (
              <div className={styles.control}>
                <ButtonService
                  btnName={t('modal.add')}
                  className={styles.btn_save}
                  disabled={!!error}
                  handleClickButton={addItemHandler}
                />
              </div>
            )}
          </div>
        )}

        {(data || resStatus) && (
          <Formik
            initialValues={
              data
                ? { ...data }
                : {
                    _id: id,
                    nameURL: parsedData.nameURL,
                    url: urlParse,
                    image: parsedData.image,
                    price: parsedData.price,
                  }
            }
            validationSchema={data ? Schema : SchemaParsedData}
            onSubmit={handleSubmitForm}
          >
            {({ errors }) => (
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
                {data && (
                  <label>
                    {t('modal.link')}
                    <FormikTextInput
                      type="text"
                      name="url"
                      placeholder="https://wish.com/darrell_steward/"
                      className={styles.input}
                    />
                  </label>
                )}
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
                  <div>
                    <CustomSelect
                      className={styled.select}
                      options={wishlists.map((item) => {
                        return {
                          value: item._id,
                          name: item.name,
                        };
                      })}
                      setSelected={setId}
                    />
                  </div>
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
                    disabled={Object.keys(errors).length !== 0}
                  />
                </div>
              </Form>
            )}
          </Formik>
        )}
      </div>
    </Modal>
  );
};

interface IProps {
  isModal: boolean | string;
  setIsModal: (value: boolean) => void;
  data?: IProduct;
  wishlistId?: string;
}

export { AddEditWishModal };
