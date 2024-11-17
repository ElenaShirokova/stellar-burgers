import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { Preloader } from '@ui';
import { useSelector, useDispatch } from '../../services/store';
import { TRegisterData } from '../../utils/burger-api';
import { registerUser, loginUserRequestSelector } from '../../slices/userSlice';

export const Register: FC = () => {
  const [name, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const request = useSelector(loginUserRequestSelector);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const newUser: TRegisterData = {
      name: name,
      email: email,
      password: password
    };
    dispatch(registerUser(newUser));
  };

  if (request) {
    return <Preloader />;
  }

  return (
    <RegisterUI
      errorText=''
      email={email}
      userName={name}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
