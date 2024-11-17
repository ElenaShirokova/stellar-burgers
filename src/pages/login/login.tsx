import { FC, SyntheticEvent, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { TLoginData } from '../../utils/burger-api';
import { loginUser, isAuthenticatedSelector } from '../../slices/userSlice';

export const Login: FC = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isAuthenticated = useSelector(isAuthenticatedSelector);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    const userLoginData: TLoginData = {
      email: email,
      password: password
    };
    dispatch(loginUser(userLoginData));
  };

  if (isAuthenticated) {
    return <Navigate to={'/'} />;
  }

  return (
    <LoginUI
      errorText=''
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
