import cn from 'classnames';
import { FC, useState } from 'react';
import { useDetectClickOutside } from 'react-detect-click-outside';
import { useTranslation } from 'react-i18next';

import styles from './CustomSelect.module.scss';

type IOptions = {
  value: string;
  name: string;
};

interface IProps {
  selectedName?: string;
  options: IOptions[];
  setSelected: (item: any) => void;
  className?: any;
  forLanguage?: boolean | string;
}

export const CustomSelect: FC<IProps> = ({
  selectedName,
  setSelected,
  options,
  className,
  forLanguage = false,
}) => {
  const [isActive, setIsActive] = useState(false);
  const findActive =
    options.find(
      (item) => item.value.toLocaleLowerCase() === selectedName?.toLocaleLowerCase(),
    )?.name || '';

  const [activeElement, setActiveElement] = useState<string>(findActive);
  const ref = useDetectClickOutside({ onTriggered: () => setIsActive(false) });

  const { t } = useTranslation();
  const selectIfLanguages = (item: IOptions) =>
    forLanguage ? t(item.name) : item.name;

  return (
    <div
      className={cn(styles.dropdown, className)}
      ref={ref}
      data-attr={isActive ? 'rotate' : ''}
    >
      <div className={styles.dropdown_btn} onClick={() => setIsActive(!isActive)}>
        {forLanguage ? t(activeElement) : activeElement}
      </div>
      {isActive && (
        <div className={styles.dropdown_content}>
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => {
                setSelected(option.value);
                setActiveElement(() => selectIfLanguages(option));
                setIsActive(false);
              }}
              className={styles.dropdown_item}
            >
              {selectIfLanguages(option)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
