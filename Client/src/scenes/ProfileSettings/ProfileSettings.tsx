import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { Form, Formik } from 'formik';
import React from 'react';
import ReactS3Client from 'react-aws-s3-typescript';
import DatePicker from 'react-datepicker';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

import { ButtonService } from '../../components/common/ButtonSendForm/ButtonSendForm';
import { FormikTextInput } from '../../components/common/FormikInput/FormikInput';
import Icon from '../../components/common/IconComponent/Icon';
import Image from '../../components/common/ImageComponent/Image';
import { AppRootStateType } from '../../store/store';
import { updateUser, updateUserPic } from '../../store/user-reducer';
import { s3Config } from '../../utils/s3Config';
import { IInitialValues } from './common-types';

import wishliLogo from '../../assets/svg/wishly-logo.svg';

import styles from './ProfileSettings.module.scss';

export const ProfileSettings = () => {
  const dispatch = useDispatch();
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

  const handleUpload = async (file) => {
    const s3 = new ReactS3Client(s3Config);

    try {
      const res = await s3.uploadFile(file);
      if (res.status === 204) {
        dispatch(updateUserPic(res.location));
      }
    } catch (exception) {
      console.log(exception);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    if (e.target.files == null) {
      throw new Error('Error finding e.target.files');
    }
    handleUpload(e.target.files[0]);
  };

  const { email, userPic, bio, date, name, nickName, facebook, instagram, twitter } =
    useSelector((state: AppRootStateType) => state.users.user);

  const initialValues: IInitialValues = {
    name,
    date,
    email,
    bio,
    nickName,
    password: '',
    newPassword: '',
    facebook,
    twitter,
    instagram,
  };

  const handleSubmitForm = (values) => {
    dispatch(updateUser({ ...values, date: values.date }));
  };

  return (
    <div className={styles.pageWrapper}>
      <img className={styles.logo} src={wishliLogo} alt="Wishli logo"></img>
      <Formik
        initialValues={initialValues}
        validationSchema={LoginSchema}
        onSubmit={(values) => handleSubmitForm(values)}
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
                <div className={styles.uploadBox}>
                  <Icon size="sm" name={faUpload} />
                  <input
                    type="file"
                    className={styles.uploadInput}
                    onChange={handleFileInput}
                  />
                  <span>{t('settings.upload')}</span>
                </div>
              </section>
              <section>
                <div className={styles.sectionName}>
                  <p>{t('settings.PublicProfile')}</p>
                </div>
                <div className={styles.section}>
                  <label>{t('settings.name')}</label>
                  <FormikTextInput
                    name="name"
                    type="text"
                    placeholder="Darrell Steward"
                  />
                  <label> {t('settings.birthdayDate')}</label>

                  <DatePicker
                    selected={new Date(values.date)}
                    dateFormat="d.MM.yyyy"
                    name="date"
                    peekNextMonth={false}
                    className={styles.datePicker}
                    onChange={(date) => setFieldValue('date', date)}
                    placeholderText="12.12.1998"
                  />
                  <label>{t('settings.email')}</label>
                  <FormikTextInput
                    name="email"
                    type="email"
                    disabled={true}
                    placeholder="darrell@steward.com"
                  />
                  <label>{t('settings.bio')}</label>
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
                  <p> {t('settings.AccountSetting')}</p>
                </div>
                <div className={styles.section}>
                  <label>{t('settings.username')}</label>
                  <FormikTextInput
                    className={styles.userName}
                    name="nickName"
                    type="text"
                    placeholder="darrell_steward"
                  />
                  <p className={styles.url}>
                    {t('settings.url')}:
                    {` https://wish.com/${
                      nickName?.length > 0 ? nickName : 'darrell_steward'
                    }`}
                  </p>
                  <div className={styles.selectors}>
                    <div>
                      <label>{t('settings.language')}</label>
                      <select
                        name="select"
                        defaultValue={localStorage.getItem('i18nextLng') || 'en'}
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
                  <p>{t('settings.Password')}</p>
                </div>
                <div className={styles.selectors}>
                  <div>
                    <label> {t('settings.oldPassword')}</label>
                    <FormikTextInput
                      type="password"
                      name="password"
                      placeholder="old password"
                    />
                  </div>
                  <div>
                    <label> {t('settings.newPassword')}</label>
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
                  <FormikTextInput
                    type="text"
                    name="facebook"
                    placeholder="https://facebook.com"
                  />
                  <label>Twitter</label>
                  <FormikTextInput
                    type="text"
                    name="twitter"
                    placeholder="https://twitter.com"
                  />
                  <label>Instagram</label>
                  <FormikTextInput
                    type="text"
                    name="instagram"
                    placeholder="https://instagram.com"
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
