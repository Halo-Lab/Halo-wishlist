import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { Form, Formik } from 'formik';
import DatePicker from 'react-datepicker';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';

import UserRequest from '../../api/request/UserRequest';
import { ButtonService } from '../../components/common/ButtonSendForm/ButtonSendForm';
import { FormikTextInput } from '../../components/common/FormikInput/FormikInput';
import Icon from '../../components/common/IconComponent/Icon';
import Image from '../../components/common/ImageComponent/Image';
import { AppRootStateType } from '../../store/store';
import { IInitialValues } from './common-types';

import wishliLogo from '../../assets/svg/wishli-logo.svg';

import styles from './ProfileSettings.module.scss';

export const ProfileSettings = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email(t('errors.notValidEmail'))
      .max(50, t('errors.emailMaxLength'))
      .required(t('errors.required')),
    name: Yup.string()
      .min(4, t('errors.passwordMinLength'))
      .max(50, t('errors.passwordMaxLength'))
      .required(t('errors.required')),
  });

  const { email, userPic, bio, date, name, nickName } = useSelector(
    (state: AppRootStateType) => state.users.user,
  );

  const initialValues: IInitialValues = {
    name,
    birthday: date,
    email,
    bio,
    nickName,
    password: '',
    newPassword: '',
  };

  return (
    <div className={styles.pageWrapper}>
      <img className={styles.logo} src={wishliLogo} alt="Wishli logo"></img>
      <Formik
        initialValues={initialValues}
        validationSchema={LoginSchema}
        onSubmit={(values) =>
          UserRequest.updateUSerProfile(
            values.name,
            values.bio,
            values.birthday,
            values.nickName,
            values.password,
            values.newPassword,
          )
        }
      >
        {({ errors, values, setFieldValue }) => (
          <Form>
            <div className={styles.settings}>
              <section className={styles.iconBlock}>
                <Image
                  alt="User Photo"
                  src={userPic}
                  width={88}
                  height={88}
                  circle
                />
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
                  <FormikTextInput
                    name="name"
                    type="text"
                    placeholder="Darrell Steward"
                  />
                  <label>Birthday date</label>

                  <DatePicker
                    selected={new Date(values.birthday)}
                    dateFormat="d.MM.yyyy"
                    name="birthday"
                    peekNextMonth={false}
                    className={styles.datePicker}
                    onChange={(date) => setFieldValue('birthday', date)}
                    placeholderText="12.12.1998"
                  />
                  <label>Email</label>
                  <FormikTextInput
                    name="email"
                    type="email"
                    disabled={true}
                    placeholder="darrell@steward.com"
                  />
                  <label>Bio</label>
                  <FormikTextInput
                    name="bio"
                    type="text"
                    as="textarea"
                    rows="4"
                    placeholder="Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint."
                  />
                </div>
              </section>
              <section>
                <div className={styles.sectionName}>
                  <p>Account setting</p>
                </div>
                <div className={styles.section}>
                  <label>Username</label>
                  <FormikTextInput
                    className={styles.userName}
                    name="nickName"
                    type="text"
                    placeholder="darrell_steward"
                  />
                  <p className={styles.url}>
                    Your Wish URL:{' '}
                    {`https://wish.com/${
                      nickName.length > 0 ? nickName : 'darrell_steward'
                    }`}
                  </p>
                  <div className={styles.selectors}>
                    <div>
                      <label>Language</label>
                      <select
                        name="select"
                        defaultValue="value1"
                        onChange={(e) => changeLanguage(e.target.value)}
                      >
                        <option value="en">English</option>
                        <option value="uk">Ukrainian</option>
                      </select>
                    </div>
                    <div>
                      <label>Membership</label>
                      <select name="select" defaultValue="value1" disabled>
                        <option value="value1">Best user ever!</option>
                        <option value="value2">Значение 2</option>
                        <option value="value3">Значение 3</option>
                      </select>
                    </div>
                  </div>
                </div>
              </section>
              <section className={styles.section}>
                <div className={styles.sectionName}>
                  <p>Password</p>
                </div>
                <div className={styles.selectors}>
                  <div>
                    <label>Old password</label>
                    <FormikTextInput
                      type="password"
                      name="password"
                      placeholder="old password"
                    />
                  </div>
                  <div>
                    <label>New password</label>
                    <FormikTextInput
                      type="password"
                      name="newPassword"
                      placeholder="new password"
                    />
                  </div>
                </div>
              </section>
              <section>
                <div className={styles.sectionName}>
                  <p>Public profile</p>
                </div>
                <div className={styles.section}>
                  <label>Facebook</label>
                  <input
                    type="text"
                    placeholder="https://ru-ru.facebook.com/login/"
                  />
                  <label>Twitter</label>
                  <input
                    type="text"
                    placeholder="https://ru-ru.facebook.com/login/"
                  />
                  <label>Instagram</label>
                  <input
                    type="text"
                    placeholder="https://ru-ru.facebook.com/login/"
                  />
                </div>
              </section>
              <div className={styles.buttonsBlock}>
                <ButtonService
                  btnName="Save profile"
                  disabled={Object.keys(errors).length > 0}
                />
                <ButtonService
                  btnName="Delete Account"
                  disabled={false}
                  className={styles.deleteButton}
                />
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
