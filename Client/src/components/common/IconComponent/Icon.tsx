import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { FC } from 'react';

export interface IIcon {
  name: any;
  className?: string;
  size: 'xs' | 'sm' | 'lg' | '2x' | '3x' | '5x' | '7x' | '10x';
}

const Icon: FC<IIcon> = ({ name, className, size, ...attrs }) => {
  const classes = classNames(className);

  return <FontAwesomeIcon icon={name} {...attrs} className={classes} size={size} />;
};

Icon.defaultProps = {
  name: 'facebook',
  className: '',
  size: 'sm',
};

export default Icon;
