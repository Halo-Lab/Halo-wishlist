import { FC } from 'react';

import styles from './CustomTab.module.scss';

export const CustomTab: FC<IProps> = ({ itemsCount = 0, tabName }) => {
  return (
    <div className={styles.container}>
      <p className={styles.tab_name}>{tabName}:</p>
      <p>{itemsCount} items</p>
    </div>
  );
};

type IProps = {
  itemsCount: string | number | undefined;
  tabName: string | undefined;
};
