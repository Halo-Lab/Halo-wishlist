import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Redirect, Route, useHistory } from 'react-router-dom';

import LoginForm from './components/LoginForm/LoginForm';
import RegistrationForm from './components/RegistrationForm/RegistrationForm';
import { ProfilePage } from './scenes/ProfilePage/ProfilePage';
import { ProfileSettings } from './scenes/ProfileSettings/ProfileSettings';
import { ViewPage } from './scenes/ViewPage';
import { AppRootStateType } from './store/store';
import { UserStateType } from './store/user-reducer';
import { checkUserLogin } from './store/user-reducer';

const App: FC = () => {
  const dispatch = useDispatch();
  const user = useSelector<AppRootStateType, UserStateType>((state) => state.users);
  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(checkUserLogin());
    }
  }, []);

  const nick = 'mario';

  if (user.isLoading) {
    return <div>Loading...</div>;
  }

  if (!user.isLoggedIn) {
    return (
      <div className="main-wrapper">
        <Switch>
          <Route path="/" render={() => <LoginForm />} exact />
          <Route path="/registration" render={() => <RegistrationForm />} />
          <Route path={`/:${nick}/:listID`} render={() => <ViewPage />} />
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
        <Route
          path="/"
          render={() => (
            <ProfilePage
              email={user.user.email}
              id={user.user.id}
              isActivated={user.user.isActivated}
            />
          )}
        />
        <Redirect to="/" />
      </Switch>
    </div>
  );
};

export default App;
