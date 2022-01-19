import cn from 'classnames';
import { SyntheticEvent, useRef } from 'react';

import close_icon from '../../../assets/svg/close.svg';

import styles from './Modal.module.scss';

const Modal: React.FC<IProps> = ({ children, isOpen, setIsOpen }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const closeModal = (event: SyntheticEvent) => {
    if (modalRef.current === event.target) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {isOpen && (
        <div
          className={cn(styles.modal, { [styles.active]: isOpen })}
          ref={modalRef}
          onMouseDown={closeModal}
        >
          <div className={styles.modal_content}>
            <img
              src={close_icon}
              className={styles.btn_close}
              onClick={() => setIsOpen(false)}
            />
            {children}
          </div>
        </div>
      )}
    </>
  );
};

interface IProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export { Modal };
