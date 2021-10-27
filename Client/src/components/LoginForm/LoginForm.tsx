import cn from 'classnames';
import { Field, Form, Formik } from 'formik';
import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as Yup from 'yup';

import { writeCookie } from '../../helpers/set-cookies';
import { ILogin } from '../../models/IUser';
import { loginUser } from '../../store/user-reducer';
import { ButtonService } from '../common/ButtonSendForm/ButtonSendForm';
import { EyePass } from '../common/SvgComponents/EyePass';

import styles from './LoginForm.module.scss';

const LoginForm: FC = () => {
  const [passwordVisibility, setPasswordVisibility] = useState<boolean>(false);
  const [isRemember, setIsRemember] = useState<boolean>(true);

  const dispatch = useDispatch();

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email('Must be a valid email!')
      .max(50, 'Too Long!')
      .required('Required'),
    password: Yup.string()
      .min(4, 'min: 4 characters!')
      .max(50, 'max: 20 characters!')
      .required('Required'),
  });

  const handleChangePasswordVisibility = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    setPasswordVisibility(!passwordVisibility);
  };

  const handleSubmitForm = (values: ILogin) => {
    const { email, password } = values;
    writeCookie('rememberMe', isRemember, 1);
    dispatch(loginUser(email, password, isRemember));
  };

  const handelChangeRemember = () => {
    setIsRemember(!isRemember);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.form}>
          <h1 className={styles.title}>Log in</h1>
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            onSubmit={handleSubmitForm}
            validationSchema={LoginSchema}
          >
            {({ errors, touched }) => (
              <Form>
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
                    placeholder="Password"
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
                  <span
                    className={cn(styles.checkbox, {
                      [styles.activeCheckbox]: isRemember,
                    })}
                    onClick={handelChangeRemember}
                  />
                  <p className={styles.remember}>Remember me</p>
                  <p className={styles.forgot}>Forgot your password?</p>
                </div>
                <ButtonService
                  btnName={'Login'}
                  disabled={errors.email || errors.password ? true : false}
                />
              </Form>
            )}
          </Formik>
        </div>
        <p className={styles.loginLink}>
          Don't have an account?{' '}
          <NavLink className={styles.navLink} to="/registration">
            Sign up
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
