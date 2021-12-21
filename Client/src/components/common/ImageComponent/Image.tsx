import classNames from 'classnames';
import { FC } from 'react';

import UserAvatar from '../../../assets/png/user_avatar.png';

import styles from './Image.module.scss';

export interface IImage {
  src: string | undefined;
  alt: string;
  width: number;
  height?: number;
  circle?: boolean;
  className?: string;
  userPlaceholder?: string | boolean;
}

const Image: FC<IImage> = ({
  src,
  alt,
  className,
  width,
  height,
  circle,
  userPlaceholder,
  ...attrs
}) => {
  const classes = classNames(className, styles.baseImage, {
    [styles.circle]: circle,
  });

  if (!src) {
    src = userPlaceholder
      ? UserAvatar
      : `https://via.placeholder.com/${width}x${height}`;
  }

  return (
    <img
      src={src}
      alt={alt}
      className={classes}
      width={width}
      height={height}
      {...attrs}
    />
  );
};

Image.defaultProps = {
  src: '',
  alt: 'image',
  width: 100,
  height: 100,
  circle: false,
  className: '',
};

export default Image;
