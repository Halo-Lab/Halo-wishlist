import logo from '../../../assets/svg/wishly-logo.svg';

import styles from './ListItem.module.scss';

export const ListItem = ({ image }) => {
  return (
    <div className={styles.square}>
      <div className={styles.content}>
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
