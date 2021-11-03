import classNames from 'classnames';
import { FC } from 'react';

import styles from './Image.module.scss';

export interface IImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  circle?: boolean;
  className?: string;
}

const Image: FC<IImage> = ({
  src,
  alt,
  className,
  width,
  height,
  circle,
  ...attrs
}) => {
  const classes = classNames(className, { [styles.circle]: circle });

  if (!src) {
    src = `https://via.placeholder.com/${width}x${height}`;
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
