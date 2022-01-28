import { FC } from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { useDispatch } from 'react-redux';

import { facebookAuth } from '../../store/user-reducer';
import { ButtonService } from '../common/ButtonSendForm/ButtonSendForm';

import facebook_icon from '../../assets/svg/facebook.svg';

import styles from '../GoogleAuth/GoogleFBLogin.module.scss';

const appId = process.env.REACT_APP_FACEBOOK_APP_ID;

const FacebookAuth: FC = () => {
  const dispatch = useDispatch();

  const responseFacebook = (res) => {
    dispatch(facebookAuth(res.userID, res.accessToken));
  };

  return (
    <>
      <FacebookLogin
        appId={appId}
        fields=""
        callback={responseFacebook}
        render={(renderProps) => (
          <div onClick={renderProps.onClick} className={styles.btn_login}>
            <ButtonService btnName="">
              <img
                src={facebook_icon}
                alt="Login with facebook"
                className={styles.icon}
              />
            </ButtonService>
          </div>
        )}
      />
    </>
  );
};

export { FacebookAuth };
