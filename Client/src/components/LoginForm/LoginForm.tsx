import cn from 'classnames';
import { Field, Form, Formik } from 'formik';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as Yup from 'yup';

import { ILogin } from '../../models/IUser';
import { loginUser } from '../../store/user-reducer';
import '../../utils/i18next';
import { ForgotPassword } from '../ForgotPassword';
import { GoogleLogin } from '../GoogleAuth/Login';
import { ButtonService } from '../common/ButtonSendForm/ButtonSendForm';
import { ChangeLanguage } from '../common/ChangeLanguage';
import { Modal } from '../common/Modal/Modal';
import { EyePass } from '../common/SvgComponents/EyePass';

import styles from './LoginForm.module.scss';

const LoginForm: FC = () => {
  const [passwordVisibility, setPasswordVisibility] = useState<boolean>(false);
  const [isRemember, setIsRemember] = useState<boolean>(true);
  const [isForgot, setIsForgot] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email(t('errors.notValidEmail'))
      .max(50, t('errors.emailMaxLength'))
      .required(t('errors.required')),
    password: Yup.string()
      .min(4, t('errors.passwordMinLength'))
      .max(50, t('errors.passwordMaxLength'))
      .required(t('errors.required')),
  });

  const handleChangePasswordVisibility = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    setPasswordVisibility(!passwordVisibility);
  };

  const handleSubmitForm = (values: ILogin) => {
    const { email, password } = values;
    dispatch(loginUser(email.toLocaleLowerCase(), password, isRemember));
  };

  const handleChangeRemember = () => {
    setIsRemember(!isRemember);
  };

  return (
    <>
      <Modal isOpen={isForgot} setIsOpen={setIsForgot}>
        <ForgotPassword />
      </Modal>
      <div className={styles.overlay}>
        <ChangeLanguage className={styles.language} />
        <div className={styles.modal}>
          <div className={styles.form}>
            <h1 className={styles.title}>{t('auth.login')}</h1>
            <GoogleLogin />
            <div className={styles.spacer}>
              <hr />
              <span>{t('auth.or')}</span>
              <hr />
            </div>
            <Formik
              initialValues={{
                email: '',
                password: '',
              }}
              onSubmit={handleSubmitForm}
              validationSchema={LoginSchema}
            >
              {({ errors, touched, isSubmitting, setSubmitting }) => (
                <Form onFocus={() => setSubmitting(false)}>
                  <div className={styles.inputWrapper}>
                    {errors.email && touched.email ? (
                      <div className={styles.error}>{errors.email}</div>
                    ) : null}
                    <Field
                      name="email"
                      placeholder="user@gmail.com"
                      className={styles.input}
                    />
                  </div>
                  <div className={styles.inputWrapper}>
                    {errors.password && touched.password ? (
                      <div className={styles.error}>{errors.password}</div>
                    ) : null}
                    <Field
                      name={'password'}
                      placeholder={t('auth.password')}
                      type={passwordVisibility ? null : 'password'}
                      className={styles.input}
                    />
                    <span className={styles.showPass}>
                      <EyePass
                        changeColor={handleChangePasswordVisibility}
                        visible={passwordVisibility ? 1 : 0.4}
                      />
                    </span>
                  </div>
                  <div className={styles.helpersBlock}>
                    <div className={styles.rememberBlock}>
                      <span
                        className={cn(styles.checkbox, {
                          [styles.activeCheckbox]: isRemember,
                        })}
                        onClick={handleChangeRemember}
                      />
                      <p className={styles.remember} onClick={handleChangeRemember}>
                        {t('auth.rememberMe')}
                      </p>
                    </div>
                    <p className={styles.forgot} onClick={() => setIsForgot(true)}>
                      {t('auth.forgot')}
                    </p>
                  </div>
                  <ButtonService
                    btnName={t('auth.login')}
                    disabled={!!(errors.email || errors.password) || isSubmitting}
                  />
                </Form>
              )}
            </Formik>
          </div>
          <p className={styles.loginLink}>
            {t("auth.haven'tAccount")}{' '}
            <NavLink className={styles.navLink} to="/registration">
              {t('auth.signUp')}
            </NavLink>
          </p>
        </div>
        <NavLink
          to="/privacy"
          target="_blank"
          className={cn(styles.privacyLink, styles.loginLink)}
        >
          Privacy policy
        </NavLink>
      </div>
    </>
  );
};

export default LoginForm;
