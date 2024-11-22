import { FC, useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { ingredientsSelector } from '../../slices/ingredientsSlice';
import { getOrderByNumber } from '../../slices/feedSlice';
import { useSelector, useDispatch } from '../../services/store';
import { RootState } from '../../services/store';

const selectOrderById = (number: number) => (state: RootState) => {
  if (state.feed.orders.length || state.history.orders.length) {
    return (
      state.feed.orders.find((order) => order.number === number) ||
      state.history.orders.find((order) => order.number === number)
    );
  }
  if (state.feed.modalOrder) {
    return state.feed.modalOrder.number === number
      ? state.feed.modalOrder
      : null;
  }
  return null;
};

export const OrderInfo: FC = () => {
  const { number } = useParams();
  const dispatch = useDispatch();
  const orderData = useSelector(selectOrderById(Number(number)));

  const ingredients: TIngredient[] = useSelector(ingredientsSelector);

  useEffect(() => {
    if (!orderData) {
      dispatch(getOrderByNumber(Number(number)));
    }
  }, [dispatch]);

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
