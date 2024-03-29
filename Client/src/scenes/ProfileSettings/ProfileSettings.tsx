import { Form, Formik } from 'formik';
import React from 'react';
import ReactS3Client from 'react-aws-s3-typescript';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

import { ButtonService } from '../../components/common/ButtonSendForm/ButtonSendForm';
import { CustomSelect } from '../../components/common/DropDownSelect/CustomSelect';
import { FormikTextInput } from '../../components/common/FormikInput/FormikInput';
import Image from '../../components/common/ImageComponent/Image';
import { AppRootStateType } from '../../store/store';
import { updateUser, updateUserPic } from '../../store/user-reducer';
import { s3Config } from '../../utils/s3Config';
import * as notify from './../../utils/notifications';
import { IInitialValues } from './common-types';

import logo from '../../assets/svg/wishyou-logo.svg';

import styles from './ProfileSettings.module.scss';

export const ProfileSettings = () => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  const SettingsSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, t('errors.tooShort'))
      .max(50, t('errors.emailMaxLength'))
      .required(t('errors.required')),
    email: Yup.string()
      .email(t('errors.notValidEmail'))
      .max(50, t('errors.emailMaxLength'))
      .required(t('errors.required')),
    bio: Yup.string(),
    date: Yup.mixed().required(t('errors.required')),
    nickName: Yup.string(),
    facebook: Yup.string().matches(
      /(?:https?:\/\/)?(?:www\.)?(?:facebook|fb|m\.facebook)\.(?:com|me)\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*([\w\-\.]+)(?:\/)?/i,
      'Incorrect URL',
    ),
    twitter: Yup.string().matches(
      /(?:http:\/\/)?(?:www\.)?twitter\.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*([\w\-]*)/,
      'Incorrect URL',
    ),
    instagram: Yup.string().matches(
      /(?:(?:http|https):\/\/)?(?:www\.)?(?:instagram\.com|instagr\.am)\/([A-Za-z0-9-_\.]+)/im,
      'Incorrect URL',
    ),
    password: Yup.string().min(4, t('errors.passwordMinLength')).notRequired(),
    newPassword: Yup.string()
      .min(4, t('errors.passwordMinLength'))
      .when('password', {
        is: (val) => {
          if (val) return true;
        },
        then: Yup.string().required(''),
      })
      .when('password', {
        is: (val) => {
          if (val) return true;
        },
        then: Yup.string().not([Yup.ref('password')], t('errors.matchPassword')),
      }),
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

    if (e.target.files === null || undefined) {
      throw new Error('Error finding e.target.files');
    }

    const file: FileList = e.target.files;

    if (
      file[0]?.type !== 'image/png' &&
      file[0]?.type !== 'image/jpeg' &&
      file[0]?.type !== 'image/jpg'
    ) {
      notify.warn('Please, upload only png or jpeg files');
      return;
    }
    if (file[0]?.size > 10000000) {
      notify.warn('The file exceeds 10 MB');
      return;
    }

    handleUpload(file[0]);
  };

  const {
    email,
    userPic,
    bio,
    date,
    name,
    nickName,
    facebook,
    instagram,
    twitter,
    id,
    isActivated,
  } = useSelector((state: AppRootStateType) => state.users.user);

  const initialValues: IInitialValues = {
    name,
    date: date || new Date('12.12.1998'),
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
      <Link to="/">
        <Image alt="wishyou logo" src={logo} width={150} height={37} />
      </Link>
      <Formik
        initialValues={initialValues}
        validationSchema={SettingsSchema}
        onSubmit={(values, actions) => {
          handleSubmitForm(values);
          actions.resetForm({
            values: {
              ...values,
              password: '',
              newPassword: '',
            },
          });
        }}
      >
        {({ errors, values, setFieldValue, isSubmitting, touched }) => (
          <Form>
            <div className={styles.settings}>
              <section className={styles.iconBlock}>
                <Image
                  alt="User Photo"
                  src={userPic}
                  userPlaceholder="true"
                  width={88}
                  height={88}
                  circle
                />
                <div className={styles.uploadBox}>
                  <label htmlFor="upload">{t('settings.upload')}</label>
                  <input
                    type="file"
                    accept="image/png, image/jpeg"
                    id="upload"
                    className={styles.uploadInput}
                    onChange={handleFileInput}
                  />
                </div>
              </section>

              <section>
                <div className={styles.sectionName}>
                  <p>{t('settings.PublicProfile')}</p>
                </div>
                <div className={styles.section}>
                  <label className={styles.requiredStars}>
                    {t('settings.name')}
                  </label>
                  <FormikTextInput
                    name="name"
                    type="text"
                    placeholder="Darrell Steward"
                  />
                  <label className={styles.requiredStars}>
                    {' '}
                    {t('settings.birthdayDate')}
                  </label>

                  <DatePicker
                    selected={new Date(values.date)}
                    dateFormat="dd.MM.yyyy"
                    name="date"
                    maxDate={new Date()}
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
                    autoComplete="username"
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
                  <div className={styles.verification}>
                    <p>
                      Verification CODE:{' '}
                      <span>{isActivated ? id : 'check your mail'}</span>
                    </p>
                  </div>
                  <label>{t('settings.username')}</label>
                  <FormikTextInput
                    className={styles.userName}
                    name="nickName"
                    type="text"
                    placeholder="darrell_steward"
                  />
                  <p className={styles.url}>
                    {t('settings.url')}:
                    {` ${process.env.REACT_APP_CLIENT_URL}${
                      nickName?.length > 0 ? nickName : id
                    }`}
                  </p>
                  <div className={styles.selectors}>
                    <div className={styles.selectorCuret}>
                      <label>{t('settings.language')}</label>
                      <CustomSelect
                        options={[
                          { value: 'en', name: 'English' },
                          { value: 'uk', name: 'Ukrainian' },
                        ]}
                        setSelected={changeLanguage}
                        selectedName={localStorage.getItem('i18nextLng') || 'en'}
                        forLanguage="true"
                      />
                    </div>
                    <div className={styles.selectorCuret}>
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
                    <FormikTextInput type="password" name="password" />
                  </div>

                  <div>
                    <label> {t('settings.newPassword')}</label>
                    <FormikTextInput
                      type="password"
                      name="newPassword"
                      autoComplete="new-password"
                    />
                    {touched.password && values.password && !values.newPassword && (
                      <div className={styles.error}>
                        {t('errors.newPasswordReq')}
                      </div>
                    )}
                  </div>
                </div>
              </section>

              <section>
                <div className={styles.sectionName}>
                  <p>{t('settings.socialProfiles')}</p>
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
                {!Object.entries(errors).length || (
                  <div className={styles.requiredFields}>
                    <p>* - required fields</p>
                  </div>
                )}
              </section>

              <div className={styles.buttonsBlock}>
                <ButtonService
                  className={styles.sendFormBtn}
                  btnName={t('settings.save')}
                  disabled={
                    Object.keys(errors).length > 0 ||
                    values === initialValues ||
                    isSubmitting
                  }
                />
                {/* <ButtonService
                  btnName="Delete Account"
                  disabled={false}
                  className={styles.deleteButton}
                /> */}
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
