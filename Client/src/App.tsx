import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import { AppRootStateType } from './store/store';
import { logoutUser, UserStateType } from './store/user-reducer';
import { checkUserLogin } from './store/user-reducer';

const App: FC = () => {
  const dispatch = useDispatch();
  const user = useSelector<AppRootStateType, UserStateType>((state) => state.users);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(checkUserLogin());
    }
    // if (localStorage.getItem('rememberMe') === 'false') {
    //   window.addEventListener('beforeunload', (e) => {
    //     e.preventDefault();
    //     localStorage.removeItem('token');
    //     deleteCookie('refreshToken');
    //   });
    // }
  }, []);

  if (user.isLoading) {
    return <div>Loading...</div>;
  }

  if (!user.isLoggedIn) {
    return (
      <div>
        <h1>Please logged in</h1>
        <LoginForm />
      </div>
    );
  }

  return (
    <div>
      <h1>{`Hello ${user.user.email}`}</h1>
      {user.user.isActivated
        ? user.user.id
        : 'An email has been sent to your mail, please confirm your account'}
      <button onClick={() => dispatch(logoutUser())}>Logout</button>
    </div>
  );
};

export default App;
