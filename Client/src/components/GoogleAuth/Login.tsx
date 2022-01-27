import { FC } from 'react';
import { useGoogleLogin } from 'react-google-login';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { googleAuth } from '../../store/user-reducer';
import { ButtonService } from '../common/ButtonSendForm/ButtonSendForm';

import google_icon from '../../assets/svg/google.svg';

import styles from './Login.module.scss';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID || '';

const GoogleLogin: FC = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const onSuccess = (res) => {
    dispatch(googleAuth(res.tokenId));
  };

  const onFailure = (res) => {
    console.error('Login failed: res:', res);
  };

  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId,
  });

  return (
    <>
      <ButtonService
        btnName={t('auth.signInGoogle')}
        handleClickButton={signIn}
        className={styles.btn_login}
      >
        <img src={google_icon} alt="Login with google" className={styles.icon} />
      </ButtonService>
    </>
  );
};

export { GoogleLogin };
