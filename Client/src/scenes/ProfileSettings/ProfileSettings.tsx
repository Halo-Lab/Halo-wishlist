import { faUpload } from '@fortawesome/free-solid-svg-icons';

import { ButtonService } from '../../components/common/ButtonSendForm/ButtonSendForm';
import Icon from '../../components/common/IconComponent/Icon';
import Image from '../../components/common/ImageComponent/Image';

import profilePhoto from '../../assets/png/testphoto.png';
import wishliLogo from '../../assets/svg/wishli-logo.svg';

import styles from './ProfileSettings.module.scss';

export const ProfileSettings = () => {
  return (
    <div className={styles.pageWrapper}>
      <img className={styles.logo} src={wishliLogo} alt="Wishli logo"></img>
      <div className={styles.settings}>
        <section className={styles.iconBlock}>
          <Image alt="User Photo" src={profilePhoto} width={88} height={88} circle />
          <div>
            <Icon size="sm" name={faUpload} />
            <span>upload</span>
          </div>
        </section>
        <section>
          <div className={styles.sectionName}>
            <p>Public profile</p>
          </div>
          <div className={styles.section}>
            <label>Name</label>
            <input type="text" placeholder="Darrell Steward" />
            <label>Birthday date</label>
            <input type="text" placeholder="12.12.1998" />
            <label>Email</label>
            <input type="text" placeholder="darrell@steward.com" />
            <label>Bio</label>
            <textarea
              rows={4}
              placeholder="Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. "
            />
          </div>
        </section>
        <section>
          <div className={styles.sectionName}>
            <p>Account setting</p>
          </div>
          <div className={styles.section}>
            <label>Username</label>
            <input placeholder="Darrell Steward" className={styles.userName} />
            <p className={styles.url}>
              Your Wish URL: https://wish.com/darrell_steward
            </p>
            <div className={styles.selectors}>
              <div>
                <label>Language</label>
                <select name="select">
                  <option value="value1">Значение 1</option>
                  <option value="value2" selected>
                    Значение 2
                  </option>
                  <option value="value3">Значение 3</option>
                </select>
              </div>
              <div>
                <label>Membership</label>
                <select name="select">
                  <option value="value1">Значение 1</option>
                  <option value="value2" selected>
                    Значение 2
                  </option>
                  <option value="value3">Значение 3</option>
                </select>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className={styles.sectionName}>
            <p>Public profile</p>
          </div>
          <div className={styles.section}>
            <label>Facebook</label>
            <input type="text" placeholder="https://ru-ru.facebook.com/login/" />
            <label>Twitter</label>
            <input type="text" placeholder="https://ru-ru.facebook.com/login/" />
            <label>Instagram</label>
            <input type="text" placeholder="https://ru-ru.facebook.com/login/" />
          </div>
        </section>
        <div className={styles.buttonsBlock}>
          <ButtonService btnName="Save profile" disabled={false} />
          <ButtonService
            btnName="Delete Account"
            disabled={false}
            className={styles.deleteButton}
          />
        </div>
      </div>
    </div>
  );
};
