import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';

import LoginForm from './components/LoginForm/LoginForm';
import RegistrationForm from './components/RegistrationForm/RegistrationForm';
import { AdminPage } from './scenes/AdminPage/AdminPage';
import { ListPage } from './scenes/ListPage';
import { ProfileSettings } from './scenes/ProfileSettings/ProfileSettings';
import { SharePage } from './scenes/SharePage';
import { AppRootStateType } from './store/store';
import { checkUserLogin, UserStateType } from './store/user-reducer';

const App: FC = () => {
  const dispatch = useDispatch();
  const user = useSelector<AppRootStateType, UserStateType>((state) => state.users);

  const history = useHistory();

  const { i18n } = useTranslation();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(checkUserLogin());
    }
  }, []);

  if (user.isLoading) {
    return <div></div>;
  }

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  if (!user.isLoggedIn) {
    return (
      <div className="main-wrapper">
        <div className="change__lang">
          <button onClick={() => changeLanguage('uk')} />
          <button onClick={() => changeLanguage('en')} />
        </div>
        <Switch>
          <Route path="/" render={() => <LoginForm />} exact />
          <Route path="/registration" render={() => <RegistrationForm />} />
          <Route
            path={`/shared/:userNickname/:listID`}
            render={() => <SharePage />}
          />
          <Route
            render={() => (
              <div>
                <p>Error 404</p>
                Please <button onClick={() => history.push('/')}>Login</button>
              </div>
            )}
          />
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
