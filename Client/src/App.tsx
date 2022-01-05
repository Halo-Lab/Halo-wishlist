import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';

import LoginForm from './components/LoginForm/LoginForm';
import RegistrationForm from './components/RegistrationForm/RegistrationForm';
import Image from './components/common/ImageComponent/Image';
import { Loader } from './components/common/Loader';
import { NotFound } from './scenes/404';
import { AdminPage } from './scenes/AdminPage/AdminPage';
import { ListPage } from './scenes/ListPage';
import { ProfileSettings } from './scenes/ProfileSettings/ProfileSettings';
import { SharePage } from './scenes/SharePage';
import { AppRootStateType } from './store/store';
import { checkUserLogin, UserStateType } from './store/user-reducer';

import logo from './assets/svg/wishyou-logo.svg';

const App: FC = () => {
  const dispatch = useDispatch();
  const user = useSelector<AppRootStateType, UserStateType>((state) => state.users);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (localStorage.getItem('token')) {
        dispatch(checkUserLogin());
      }
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, []);

  if (user.isLoading) {
    return (
      <div className="main-wrapper">
        <Image alt="wishyou logo" src={logo} width={150} height={37} />
        <Loader />
      </div>
    );
  }

  if (!user.isLoggedIn) {
    return (
      <div className="main-wrapper">
        <Switch>
          <Route path="/" exact render={() => <LoginForm />} />
          <Route path="/registration" render={() => <RegistrationForm />} />
          <Route
            path={`/shared/:userNickname/:listID`}
            render={() => <SharePage />}
          />
          <Route render={() => <NotFound />} />
        </Switch>
      </div>
    );
  }

  return (
    <div className="main-wrapper">
      <Switch>
        <Route path={`/`} render={() => <AdminPage />} exact />
        <Route path="/settings" render={() => <ProfileSettings />} exact />
        <Route path={`/wishlists/:listId`} render={() => <ListPage />} exact />
        <Route path={`/shared/:userNickname/:listID`} render={() => <SharePage />} />
        <Redirect to="/" />
      </Switch>
    </div>
  );
};

export default App;
