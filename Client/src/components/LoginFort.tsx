import { Field, Form, Formik } from 'formik';
import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

import { ILogin } from '../models/IUser';
import { registrationUser } from '../store/user-reducer';
import { ButtonService } from './common/ButtonSendForm';
import { EyePass } from './common/EyePass';

import styles from './LoginFort.module.scss';

const LoginForm: FC = () => {
  const [passwordVisibility, setPasswordVisibility] = useState<boolean>(false);

  const dispatch = useDispatch();

  const SignupSchema = Yup.object().shape({
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
    dispatch(registrationUser(email, password));
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h1 className={styles.title}>Sign up</h1>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          onSubmit={handleSubmitForm}
          validationSchema={SignupSchema}
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
                <EyePass
                  changeColor={handleChangePasswordVisibility}
                  visible={passwordVisibility ? 1 : 0.4}
                />
              </div>

              <p className={styles.policy}>
                By using this service you are agreeing to the terms of service and
                privacy policy
              </p>
              <ButtonService
                btnName={'Register'}
                disabled={errors.email || errors.password ? true : false}
              />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginForm;
