import { faCog } from '@fortawesome/free-solid-svg-icons';
import cn from 'classnames';
import { FC, useState } from 'react';
import { useDetectClickOutside } from 'react-detect-click-outside';

import Icon from '../../../components/common/IconComponent/Icon';
import { SettingsMenu } from '../../../components/common/SettingsMenu';
import { IProduct } from '../../../models/IProduct';

import logo from '../../../assets/svg/wishly-logo.svg';

import styles from './ListItem.module.scss';

type ISettings = {
  name: string;
  id: number;
};

type IListItem = {
  data: IProduct;
  sharedPage?: boolean | string;
};

const settingsList: Array<ISettings> = [
  { name: 'Share', id: 0 },
  { name: 'Edit', id: 1 },
  { name: 'Archive', id: 2 },
  { name: 'Delete', id: 3 },
];

export const ListItem: FC<IListItem> = ({ data, sharedPage = false }) => {
  const [visible, setVisible] = useState(false);

  const { image, nameURL, price, url } = data;

  const handleVisible = () => {
    setVisible(false);
  };

  const ref = useDetectClickOutside({ onTriggered: handleVisible });

  return (
    <div className={styles.square}>
      <div className={styles.content}>
        {!sharedPage && (
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
                <p className={styles.menuItems} key={item.id}>
                  {item.name}
                </p>
              ))}
            </SettingsMenu>
          </div>
        )}
        <img
          className={styles.img}
          src={image.length <= 0 ? logo : image}
          alt="card background"
        />
        {sharedPage ? (
          <div className={styles.sharedPage}>
            <div>
              <p>{nameURL.slice(0, 20) + '...'}</p>
              <p>{price.trim()}</p>
            </div>
            <div>
              <a href={url} target="_blank">
                Present
              </a>
            </div>
          </div>
        ) : (
          <div className={styles.info}>
            <p>{nameURL.slice(0, 33) + '...'}</p>
            <a href={url} target="_blank">
              {price.trim()}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
