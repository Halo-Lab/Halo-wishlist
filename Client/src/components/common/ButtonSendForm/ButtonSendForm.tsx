import cn from 'classnames';
import { FC } from 'react';

import styles from './ButtonSendForm.module.scss';

interface IButton {
  btnName: string;
  disabled?: boolean;
  className?: any;
  width?: string;
  height?: string;
  handleClickButton?: () => void;
}

export const ButtonService: FC<IButton> = (props) => {
  return (
    <div
      className={styles.button}
      style={{ width: props.width, height: props.height }}
    >
      <input
        className={cn(styles.inputStyles, props.className)}
        type="submit"
        value={props.btnName}
        disabled={props.disabled}
        onClick={props.handleClickButton}
      ></input>
    </div>
  );
};
