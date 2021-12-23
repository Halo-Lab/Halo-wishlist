import cn from 'classnames';
import { useTranslation } from 'react-i18next';

import styles from './ChangeLanguage.module.scss';

export const ChangeLanguage = ({ className }: any) => {
  const { i18n } = useTranslation();
  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };
  return (
    <div className={cn(styles.changeLang, className)}>
      <button onClick={() => changeLanguage('uk')} />
      <button onClick={() => changeLanguage('en')} />
    </div>
  );
};
