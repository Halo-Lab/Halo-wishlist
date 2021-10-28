import { useState } from 'react';

import { TData } from './common-types';
import { Card } from './components/Card';
import { ListItem } from './components/ListItem';
import data from './data.json';

import squaresSvg from '../../assets/svg/squares.svg';

import styles from './ViewPage.module.scss';

const ViewPage: React.FC = () => {
  const { name, userPic, cards, birthday, category } = data;

  const [isListView, setIsListView] = useState(false);

  const randomizeBackground = (background: TData['background'], key: number) => {
    if (background) return `${background}&sig=${key * 20}`;
    return background;
  };

  const arrayOfItems = Array.from({ length: 20 }, () => Math.random()).map((key) => {
    const dataWithRandomBackground = {
      ...cards[0],
      background: randomizeBackground(cards[0].background, key),
    };

    if (isListView) return <ListItem key={key} data={dataWithRandomBackground} />;
    return <Card key={key} data={dataWithRandomBackground} />;
  });

  const handleClick = () => setIsListView((prev) => !prev);

  return (
    <main className={styles.container}>
      <div className={styles.container__top}>
        <div className={styles.user}>
          <img className={styles.user__pic} src={userPic} alt="user" />
          <p className={styles.user__name}>
            {name.firstName} {name.lastName}
          </p>
          <p>{birthday}</p>
        </div>
      </div>
      <div className={styles.container__middle}>
        <p>{category}</p>
        <button className={styles.button} onClick={handleClick}>
          <img className={styles.button__icon} src={squaresSvg} alt="icon" />
          <p>Change view</p>
        </button>
      </div>
      <div className={isListView ? styles.container__list : styles.container__cards}>
        {arrayOfItems}
      </div>
    </main>
  );
};

export { ViewPage };
