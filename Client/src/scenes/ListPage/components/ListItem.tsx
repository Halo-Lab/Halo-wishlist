import styles from './ListItem.module.scss';

export const ListItem = () => {
  return (
    <div className={styles.square}>
      <div className={styles.content}>Content</div>
    </div>
  );
};
