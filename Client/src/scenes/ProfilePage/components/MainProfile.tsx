import {
  faFacebook,
  faInstagram,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { FC } from 'react';

import { DateInput } from '../../../components/common/DateInput/DateInput';
import Icon from '../../../components/common/IconComponent/Icon';
import Image from '../../../components/common/ImageComponent/Image';

import profilePhoto from '../../../assets/png/testphoto.png';

import styles from './MainProfile.module.scss';

export const MainProfile: FC = () => {
  return (
    <div className={styles.main}>
      <h1 className={styles.title}>Edit Profile</h1>
      <section className={styles.profileBLock}>
        <Image
          src={profilePhoto}
          width={183}
          height={275}
          alt="User Photo"
          className={styles.userPhoto}
        />
        <div className={styles.info}>
          <h2>Tom Cruise</h2>
          <div className={styles.icons}>
            <Icon name={faFacebook} size="lg" />
            <Icon name={faInstagram} size="lg" />
            <Icon name={faTwitter} size="lg" />
          </div>
          <h3>Bio:</h3>
          <p className={styles.bioText}>
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.
            Velit officia consequat duis enim velit mollit. Exercitation veniam
            consequat sunt nostrud amet.
          </p>
          <div className={styles.profilBEW}>
            <div>
              <div className={styles.birthday}>
                <h3>Birthday date:</h3>
                <DateInput />
              </div>
              <div className={styles.emailBlock}>
                <h3>Email:</h3>
                <p>tom@cruise.com</p>
              </div>
            </div>
            <div className={styles.wishesCount}>
              <h3>Wishes:</h3>
              <p>10</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
