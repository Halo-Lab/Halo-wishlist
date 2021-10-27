// import { useEffect } from 'react';
import { FC } from 'react';
import { useDispatch } from 'react-redux';

import { logoutUser } from '../store/user-reducer';

interface ITest {
  email: string;
  id: string;
  isActivated: boolean;
}

export const Test: FC<ITest> = ({ email, id, isActivated }) => {
  const dispatch = useDispatch();
  // function deleteCookie(name: any) {
  //   document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  // }
  // useEffect(() => {
  //   if (localStorage.getItem('rememberMe') === 'false') {
  //     const currentToken = localStorage.getItem('token');
  //     const now = new Date();
  //     const item = {
  //       value: currentToken,
  //       expiry: now.getTime() + 5,
  //     };
  //     localStorage.setItem('token', JSON.stringify(item));
  //   }
  // }, []);
  return (
    <div>
      <h1>{`Hello ${email}`}</h1>
      {isActivated
        ? id
        : 'An email has been sent to your mail, please confirm your account'}
      <button onClick={() => dispatch(logoutUser())}>Logout</button>
    </div>
  );
};
