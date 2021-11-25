import {
  faFacebookF,
  faTelegram,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { Form, Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

import * as notify from '../../../../utils/notifications';
import { ButtonService } from '../../../common/ButtonSendForm/ButtonSendForm';
import { FormikTextInput } from '../../../common/FormikInput/FormikInput';
import Icon from '../../../common/IconComponent/Icon';
import { Modal } from '../../../common/Modal/Modal';

import shareModal from '../../../../assets/png/share_modal.png';

import styles from '../../../common/Modal/Modal.module.scss';

const ShareWishlistModal: React.FC<IProps> = ({ isModal, setIsModal }) => {
  const { t } = useTranslation();

  const Schema = Yup.object().shape({
    link: Yup.string()
      .url(t('errors.url'))
      .max(50, t('errors.max50Length'))
      .required(t('errors.required')),
  });

  const handleSubmitForm = (values) => {
    navigator.clipboard
      .writeText(values)
      .then(() => {
        notify.successes(t('modal.copied'));
      })
      .catch((error) => {
        console.error(error);
        notify.successes(t('modal.failed'));
      });

    setIsModal(false);
  };

  const url = 'www.google.com';

  return (
    <Modal isOpen={isModal} setIsOpen={setIsModal}>
      <div className={styles.modal_container}>
        <img src={shareModal} alt="shareModal" className={styles.shareModal} />
        <h3 className={styles.title}>{t('modal.shareWishlist')}</h3>
        <div className={styles.social_icons}>
          <div
            className={styles.icon}
            onClick={() =>
              window.open(
                `https://www.facebook.com/sharer/sharer.php?u=${url}`,
                '_blank',
                'location=yes,height=570,width=520,scrollbars=yes,status=yes',
              )
            }
          >
            <Icon name={faFacebookF} size="lg" />
          </div>
          <div
            className={styles.icon}
            onClick={() =>
              window.open(
                `https://twitter.com/intent/tweet?url=${url}`,
                '_blank',
                'location=yes,height=570,width=520,scrollbars=yes,status=yes',
              )
            }
          >
            <Icon name={faTwitter} size="lg" />
          </div>
          <div
            className={styles.icon}
            onClick={() =>
              window.open(
                `https://telegram.me/share/?url=${url}`,
                '_blank',
                'location=yes,height=570,width=520,scrollbars=yes,status=yes',
              )
            }
          >
            <Icon name={faTelegram} size="lg" />
          </div>
        </div>
        <Formik
          initialValues={{ name: '', price: null, link: '' }}
          validationSchema={Schema}
          onSubmit={(values) => handleSubmitForm(values.link)}
        >
          {({ dirty }) => (
            <Form>
              <label>
                {t('modal.copyLink')}
                <div className={styles.copy}>
                  <div className={styles.input_link}>
                    <FormikTextInput
                      type="text"
                      name="link"
                      placeholder="https://wish.com/darrell_steward/"
                      className={styles.input}
                    />
                  </div>
                  <ButtonService
                    btnName={t('modal.copy')}
                    className={styles.btn_copy}
                    disabled={!dirty}
                  />
                </div>
              </label>
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

export { ShareWishlistModal };
