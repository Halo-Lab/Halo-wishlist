import cn from 'classnames';
import { FC } from 'react';

import styles from './ButtonSendForm.module.scss';

interface IButton {
  btnName: string;
  disabled?: boolean;
  className?: any;

  handleClickButton?: () => void;
}

export const ButtonService: FC<IButton> = (props) => {
  return (
    <div className={cn(styles.button, props.className)}>
      {props.children}
      <input
        className={styles.inputStyles}
        type="submit"
        value={props.btnName}
        disabled={props.disabled}
        onClick={props.handleClickButton}
      />
    </div>
  );
};
