import { FC } from 'react';

import styles from './CustomTab.module.scss';

export const CustomTab: FC<IProps> = ({ itemsCount = 0 }) => {
  return (
    <div className={styles.container}>
      <p>My Birthday Party:</p>
      <p>{itemsCount} items</p>
    </div>
  );
};

type IProps = {
  itemsCount: string | number | undefined;
};
