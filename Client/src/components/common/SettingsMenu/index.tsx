import cn from 'classnames';

import styles from './SettingsMenu.module.scss';

export const SettingsMenu = ({ open, className }) => {
  return (
    <div className={cn(styles.container, className, { [styles.viewStyle]: open })}>
      <p>Share</p>
      <p>Edit</p>
      <p>Archive</p>
      <p>Delete</p>
    </div>
  );
};
