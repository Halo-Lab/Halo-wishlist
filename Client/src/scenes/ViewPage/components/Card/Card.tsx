import { IWishlist } from '../../../../models/IWishlist';

import styles from './Card.module.scss';

const Card: React.FC<IProps> = ({ data }) => {
  const { image, nameURL, url, price } = data;

  return (
    <div className={styles.container}>
      {image && (
        <img className={styles.background} src={image} alt="card background" />
      )}
      <div className={styles.top}>
        <button className={styles.gift}>🎁</button>
      </div>
      <div className={styles.bottom}>
        <p>{nameURL.slice(0, 33)}</p>
        {price.length > 0 && (
          <button className={styles.price}>
            <a href={url} target="_blank">
              {price.trim()}
            </a>
          </button>
        )}
      </div>
    </div>
  );
};

interface IProps {
  data: IWishlist;
}

export { Card };
