import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Switch, Route } from 'react-router-dom';

import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm/RegistrationForm';
import { Test } from './components/Test';
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
    return <LoginForm />;
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
        <Route path="/login" render={() => <LoginForm />} exact />
        <Route path="/registration" render={() => <RegistrationForm />} exact />
      </Switch>
    </div>
  );
};

export default App;
