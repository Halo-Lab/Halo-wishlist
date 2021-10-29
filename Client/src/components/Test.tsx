import { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import api from '../api';
import { logoutUser } from '../store/user-reducer';

interface ITest {
  email: string;
  id: string;
  isActivated: boolean;
}

export const Test: FC<ITest> = ({ email, id, isActivated }) => {
  const dispatch = useDispatch();
  const [category, setCategory] = useState<any[]>([]);
  console.log(category);

  useEffect(() => {
    api
      .get('/categories/6176a2e5efa3d69a3e64a918')
      .then((res) => setCategory(res.data));
  }, []);

  return (
    <div>
      <h1>{`Hello ${email}`}</h1>
      {isActivated
        ? id
        : 'An email has been sent to your mail, please confirm your account'}
      {category.map((item) => (
        <p key={item['_id']}>{item.name}</p>
      ))}
      <button onClick={() => dispatch(logoutUser())}>Logout</button>
    </div>
  );
};
