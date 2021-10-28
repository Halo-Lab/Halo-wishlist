import type { TData } from '../../common-types';

import styles from './ListItem.module.scss';

const ListItem: React.FC<IProps> = ({ data }) => {
  const { name, background } = data;

  return (
    <div className={styles.container}>
      <div className={styles.container__left}>
        {background && (
          <img className={styles.img} src={background} alt="card background" />
        )}
        <p>{name}</p>
      </div>
      <button className={styles.gift}>🎁</button>
    </div>
  );
};

interface IProps {
  data: TData;
}

export { ListItem };
