import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';

import { loginUser, registrationUser } from '../store/user-reducer';

const LoginForm: FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const dispatch = useDispatch();
  return (
    <div>
      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="text"
        placeholder="Email"
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="password"
        placeholder="Пароль"
      />
      <button onClick={() => dispatch(loginUser(email, password))}>Login</button>

      <button onClick={() => dispatch(registrationUser(email, password))}>
        Registration
      </button>
    </div>
  );
};

export default LoginForm;
