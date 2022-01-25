import cn from 'classnames';
import { FC, useState } from 'react';

import styles from './CustomSelect.module.scss';

type IOptions = {
  value: string;
  name: string;
};

interface IProps {
  selected?: number;
  options: IOptions[];
  setSelected: (item: string) => void;
  className?: any;
}

export const CustomSelect: FC<IProps> = ({
  selected,
  setSelected,
  options,
  className,
}) => {
  const [isActive, setIsActive] = useState(false);
  const [activeElement, setActiveElement] = useState<string>(
    selected ? options[selected - 1].name : '',
  );

  return (
    <div className={cn(styles.dropdown, className)}>
      <div className={styles.dropdown_btn} onClick={() => setIsActive(!isActive)}>
        {activeElement}
      </div>
      {isActive && (
        <div className={styles.dropdown_content}>
          {options.map((option) => (
            <div
              key={option.name}
              onClick={() => {
                setSelected(option.value);
                setActiveElement(option.name);
                setIsActive(false);
              }}
              className={styles.dropdown_item}
            >
              {option.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
