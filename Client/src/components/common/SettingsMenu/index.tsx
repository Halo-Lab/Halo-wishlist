import cn from 'classnames';
import { FC } from 'react';

import styles from './SettingsMenu.module.scss';

export const SettingsMenu: FC<IProps> = ({ open, className, children }) => {
  return (
    <div className={cn(styles.container, className, { [styles.viewStyle]: open })}>
      {children}
    </div>
  );
};

interface IProps {
  open: boolean | string;
  className?: any;
  children?: React.ReactNode | HTMLFormElement;
}
