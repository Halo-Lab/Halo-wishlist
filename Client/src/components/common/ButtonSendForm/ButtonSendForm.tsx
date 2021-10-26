import { FC } from 'react';

import styles from './ButtonSendForm.module.scss';

interface IButton {
  btnName: string;
  disabled: boolean;
  handleClickButton?: () => void;
}

export const ButtonService: FC<IButton> = (props) => {
  return (
    <div className={styles.button}>
      <input
        type="submit"
        value={props.btnName}
        disabled={props.disabled}
        onClick={props.handleClickButton}
      ></input>
    </div>
  );
};
