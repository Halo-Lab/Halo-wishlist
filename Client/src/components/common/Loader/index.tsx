import cn from 'classnames';
import { FC } from 'react';

import Image from '../ImageComponent/Image';

import LoaderImage from '../../../assets/svg/IconLogo.svg';

import styles from './Loader.module.scss';

type IProps = {
  above?: boolean | string;
};

export const Loader: FC<IProps> = ({ above }) => {
  return (
    <div className={cn({ [styles.loaderBox]: above })}>
      <div className={cn(styles.loaderWrapper, { [styles.aboveLoader]: above })}>
        <Image src={LoaderImage} alt="loader image logo" width={100} />
      </div>
    </div>
  );
};
