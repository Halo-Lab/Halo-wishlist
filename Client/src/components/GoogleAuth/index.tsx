import { FC } from 'react';
import { useGoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';

import { googleAuth } from '../../store/user-reducer';
import { ButtonService } from '../common/ButtonSendForm/ButtonSendForm';

import google_icon from '../../assets/svg/google.svg';

import styles from './GoogleFBLogin.module.scss';


const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID || '';

const GoogleAuth: FC = () => {
  const dispatch = useDispatch();

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
        btnName=""
        handleClickButton={signIn}
        className={styles.btn_login}
      >
        <img src={google_icon} alt="Login with google" className={styles.icon} />
      </ButtonService>
    </>
  );
};

export { GoogleAuth };
