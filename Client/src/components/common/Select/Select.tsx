import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { IWishlist } from '../../../models/IWishlist';

import styles from './Select.module.scss';

interface Select {
  selectName: string;
  disabled?: boolean;
  className?: any;
  onChange: (event: any) => void;
  items: IWishlist[];
}

export const Select: FC<Select> = (props) => {
  const { t } = useTranslation();

  return (
    <label>
      {t('wishlist')}
      <select
        name={props.selectName}
        onChange={props.onChange}
        className={styles.selector}
      >
        {props.items.map((w) => {
          return (
            <option key={w._id} value={w._id} className={styles.option}>
              {w.name}
            </option>
          );
        })}
      </select>
    </label>
  );
};
