import {
  faFacebook,
  faInstagram,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { FC } from 'react';

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
        <h2>Tom Cruise</h2>
        <div>
          <Icon name={faFacebook} size="lg" />
          <Icon name={faInstagram} size="lg" />
          <Icon name={faTwitter} size="lg" />
        </div>
      </section>
    </div>
  );
};
