import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import {
  getFeeds,
  ordersSelector,
  loadingSelector
} from '../../slices/feedSlice';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(loadingSelector);

  useEffect(() => {
    dispatch(getFeeds()).then((result) => {});
  }, [dispatch]);

  const orders: TOrder[] = useSelector(ordersSelector);

  if (!orders.length || isLoading) {
    return <Preloader />;
  }

  const handleGetAllOrders = () => {
    dispatch(getFeeds());
  };

  return <FeedUI orders={orders} handleGetFeeds={handleGetAllOrders} />;
};
