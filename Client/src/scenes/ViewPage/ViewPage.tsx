import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import AuthRequest from '../../api/request/AuthRequest';
import { WishlistResponse } from '../../models/response/WishlistResponse';
import { TData } from './common-types';
import { Card } from './components/Card';
import { ListItem } from './components/ListItem';
import data from './data.json';

import squaresSvg from '../../assets/svg/squares.svg';

import styles from './ViewPage.module.scss';

const ViewPage: React.FC = () => {
  const { name, userPic, cards, birthday } = data;

  // Test get data

  const [lists, setLists] = useState<WishlistResponse | null>(null);
  const [serverError, setServerError] = useState<string>('');

  const { listID } = useParams<{ listID: string }>();

  useEffect(() => {
    AuthRequest.getWishlist(listID)
      .then((res) => setLists(res.data))
      .catch((error) => setServerError(error.response.data.message));
  }, []);

  // **
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
  });

  const handleClick = () => setIsListView((prev) => !prev);

  if (serverError) {
    return (
      <h2 style={{ color: 'red', width: '100%', textAlign: 'center' }}>
        {serverError}
      </h2>
    );
  }

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
        <p>{`${lists?.name[0].toUpperCase()}${lists?.name.slice(1)}`}</p>
        <button className={styles.button} onClick={handleClick}>
          <img className={styles.button__icon} src={squaresSvg} alt="icon" />
          <p>Change view</p>
        </button>
      </div>
      <div className={isListView ? styles.container__list : styles.container__cards}>
        {arrayOfItems}
        {lists?.items.map((list) => (
          <Card key={list['_id']} data={list} />
        ))}
      </div>
    </main>
  );
};

export { ViewPage };
