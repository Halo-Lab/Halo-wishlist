import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './CustomTab.module.scss';

export const CustomTab: FC<IProps> = ({
  itemsCount = 0,
  tabName = 'Wishlist name',
}) => {
  const { t } = useTranslation();
  return (
    <div className={styles.container}>
      <p className={styles.tab_name}>{tabName}:</p>
      <p>{itemsCount + ' ' + t('elements')}</p>
    </div>
  );
};

type IProps = {
  itemsCount: string | number | undefined;
  tabName: string | undefined;
};
