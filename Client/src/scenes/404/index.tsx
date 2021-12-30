import { useHistory } from 'react-router-dom';

import { ButtonService } from '../../components/common/ButtonSendForm/ButtonSendForm';
import Image from '../../components/common/ImageComponent/Image';
import * as notify from '../../utils/notifications';

import logo from '../../assets/svg/wishyou-logo.svg';

import styles from './NoteFound.module.scss';

export const NotFound = () => {
  const history = useHistory();

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <Image src={logo} alt="wishyou logo" width={150} height={37} />
        <ButtonService
          btnName="Contact us"
          className={styles.contactBtn}
          handleClickButton={() => notify.info('Something will be here soon! )')}
        />
      </div>
      <div className={styles.main}>
        <div className={styles.mainText}>
          <p>4</p>
          <p>4</p>
        </div>
        <div>
          <p className={styles.wrong}>Ooops! Something get wrong!</p>
          <ButtonService
            btnName="Home Page"
            className={styles.homeBtn}
            handleClickButton={() => history.push('/')}
          />
        </div>
      </div>
    </div>
  );
};
