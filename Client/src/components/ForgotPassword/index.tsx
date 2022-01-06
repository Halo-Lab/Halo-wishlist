import { Form, Formik } from 'formik';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

import '../../utils/i18next';
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

  const handleSubmitForm = () => {
    alert(1);
  };

  return (
    <Formik
      initialValues={{
        email: '',
      }}
      onSubmit={handleSubmitForm}
      validationSchema={LoginSchema}
    >
      {({ errors }) => (
        <Form>
          <FormikTextInput
            className={styles.input}
            type="email"
            name="email"
            placeholder="user@gmail.com"
          />

          <ButtonService
            btnName={t('auth.sendPassword')}
            disabled={errors.email ? true : false}
          />
        </Form>
      )}
    </Formik>
  );
};
