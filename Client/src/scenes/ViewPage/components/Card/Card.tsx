import type { TData } from '../../common-types';

import styles from './Card.module.scss';

const Card: React.FC<IProps> = ({ data }) => {
  const { name, background } = data;

  return (
    <div className={styles.container}>
      {background && (
        <img className={styles.background} src={background} alt="card background" />
      )}
      <div className={styles.top}>
        <button className={styles.gift}>🎁</button>
      </div>
      <div className={styles.bottom}>
        <p>{name}</p>
      </div>
    </div>
  );
};

interface IProps {
  data: TData;
}

export { Card };
