import { Form, Formik } from 'formik';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

import AuthRequest from '../../api/request/AuthRequest';
import '../../utils/i18next';
import * as notify from '../../utils/notifications';
import { ButtonService } from '../common/ButtonSendForm/ButtonSendForm';
import { FormikTextInput } from '../common/FormikInput/FormikInput';

import styles from './ForgotPassword.module.scss';

export const ForgotPassword: FC = () => {
  const { t } = useTranslation();

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email(t('errors.notValidEmail'))
      .max(50, t('errors.emailMaxLength'))
      .required(t('errors.required')),
  });

  const handleSubmitForm = (value) => {
    AuthRequest.resetPassword(value.email)
      .then((response) => notify.successes(response.data.message))
      .catch((error) => notify.error(error.response.data.message));
  };

  return (
    <Formik
      initialValues={{
        email: '',
      }}
      onSubmit={handleSubmitForm}
      validationSchema={LoginSchema}
    >
      {({ errors, isSubmitting, setSubmitting }) => (
        <Form>
          <label>{t('auth.enterYourMail')}</label>
          <FormikTextInput
            className={styles.input}
            type="email"
            name="email"
            placeholder="user@gmail.com"
            onFocus={() => setSubmitting(false)}
          />

          <ButtonService
            btnName={t('auth.sendPassword')}
            disabled={errors.email || isSubmitting ? true : false}
          />
        </Form>
      )}
    </Formik>
  );
};
