import { FC, useEffect } from 'react';
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

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(checkUserLogin());
    }
  }, []);

  if (user.isLoading) {
    return <div>Loading...</div>;
  }

  if (!user.isLoggedIn) {
    return (
      <Switch>
        <Route path="/login" render={() => <LoginForm />} />
        <Route path="/registration" render={() => <RegistrationForm />} />
        <Route path="/shared" render={() => <ViewPage />} />
        <Route path="/404">
          <h1>Note Found!</h1>
        </Route>
        <Redirect to="/404" />
      </Switch>
    );
  }

  return (
    <div>
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
