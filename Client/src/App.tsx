import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Redirect, Route } from 'react-router-dom';

import LoginForm from './components/LoginForm/LoginForm';
import RegistrationForm from './components/RegistrationForm/RegistrationForm';
import { Test } from './components/Test';
import { ViewPage } from './scenes/ViewPage';
import { AppRootStateType } from './store/store';
import { UserStateType } from './store/user-reducer';
import { checkUserLogin } from './store/user-reducer';

const App: FC = () => {
  const dispatch = useDispatch();
  const user = useSelector<AppRootStateType, UserStateType>((state) => state.users);
  const { i18n } = useTranslation();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(checkUserLogin());
    }
  }, []);

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
          <Route path="/login" render={() => <LoginForm />} />
          <Route path="/registration" render={() => <RegistrationForm />} />
          <Route path="/shared/:listID" render={() => <ViewPage />} />
          <Redirect to="/login" />
        </Switch>
      </div>
    );
  }

  return (
    <div className="main-wrapper">
      <Switch>
        <Route
          path="/"
          render={() => (
            <Test
              email={user.user.email}
              id={user.user.id}
              isActivated={user.user.isActivated}
            />
          )}
          exact
        />
        <Redirect to="/" />
      </Switch>
    </div>
  );
};

export default App;
