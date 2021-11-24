import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';

import LoginForm from './components/LoginForm/LoginForm';
import RegistrationForm from './components/RegistrationForm/RegistrationForm';
import { AdminPage } from './scenes/AdminPage/AdminPage';
import { ProfilePage } from './scenes/ProfilePage/ProfilePage';
import { ProfileSettings } from './scenes/ProfileSettings/ProfileSettings';
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

  // const nick = 'mario';

  if (user.isLoading) {
    return <div>Loading...</div>;
  }

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  if (!user.isLoggedIn) {
    return (
      <div className="main-wrapper">
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            margin: '20px',
            zIndex: 2,
            position: 'relative',
          }}
        >
          <button onClick={() => changeLanguage('uk')}>ua</button>
          <button onClick={() => changeLanguage('en')}>en</button>
        </div>
        <Switch>
          <Route path="/" render={() => <LoginForm />} exact />
          <Route path="/registration" render={() => <RegistrationForm />} />
          {/*<Route path={`/:${nick}/:listID`} render={() => <MainLayout />} />*/}
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
        <Route path="/settings" render={() => <ProfileSettings />} exact />
        <Route path={`/`} render={() => <AdminPage />} exact />
        <Redirect to="/" />
      </Switch>
    </div>
  );
};

export default App;
