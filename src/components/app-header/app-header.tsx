import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';
import { userDataSelector } from '../../slices/userSlice';

export const AppHeader: FC = () => {
  const userData = useSelector(userDataSelector);
  return (
    <>
      <AppHeaderUI userName={userData?.name} />
    </>
  );
};
