import { FC, useEffect } from 'react';
import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { Preloader } from '@ui';
import { useSelector, useDispatch } from '../../services/store';
import {
  ordersHistorySlice,
  isLoadingSlice,
  ordersHistory
} from '../../slices/userHistorySlice';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(isLoadingSlice);
  const orders: TOrder[] = useSelector(ordersHistorySlice);

  useEffect(() => {
    dispatch(ordersHistory());
  }, []);

  if (isLoading) {
    return <Preloader />;
  }

  return <ProfileOrdersUI orders={orders} />;
};
