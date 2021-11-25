import { faCog } from '@fortawesome/free-solid-svg-icons';
import cn from 'classnames';
import { useState } from 'react';
import { useDetectClickOutside } from 'react-detect-click-outside';

import Icon from '../../../components/common/IconComponent/Icon';
import { SettingsMenu } from '../../../components/common/SettingsMenu';

import logo from '../../../assets/svg/wishly-logo.svg';

import styles from './ListItem.module.scss';

type ISettings = {
  name: string;
  id: number;
};

const settingsList: Array<ISettings> = [
  { name: 'Share', id: 0 },
  { name: 'Edit', id: 1 },
  { name: 'Archive', id: 2 },
  { name: 'Delete', id: 3 },
];

export const ListItem = ({ image }) => {
  const [visible, setVisible] = useState(false);

  const handleVisible = () => {
    setVisible(false);
  };

  const ref = useDetectClickOutside({ onTriggered: handleVisible });

  return (
    <div className={styles.square}>
      <div className={styles.content}>
        <div
          className={styles.iconWrapper}
          ref={ref}
          onClick={() => setVisible(!visible)}
        >
          <Icon
            size="lg"
            name={faCog}
            className={cn(styles.iconStyle, { [styles.rotate]: visible })}
          />
          <SettingsMenu open={visible} className={styles.menuPosition}>
            {settingsList.map((item) => (
              <p key={item.id}>{item.name}</p>
            ))}
          </SettingsMenu>
        </div>
        <img
          className={styles.img}
          src={image.length <= 0 ? logo : image}
          alt="card background"
        />
        <div className={styles.info}>
          <p>Apple Iphone X</p>
          <span>$820.00</span>
        </div>
      </div>
    </div>
  );
};
