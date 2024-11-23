import {
  TStateOrdersHistory,
  ordersHistory
} from './userHistorySlice';
import historySliceReducer from './userHistorySlice';

const initialState: TStateOrdersHistory = {
  orders: [],
  isLoading: false,
  error: null
};

const testOrders = {
  success: true,
  orders: [
    {
      _id: '1',
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa093e'
      ],
      status: 'done',
      name: 'Краторный люминесцентный бургер',
      createdAt: '2024-09-02T13:46:25.234Z',
      updatedAt: '2024-09-02T13:46:25.914Z',
      number: 1
    },
    {
      _id: '2',
      ingredients: [
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa093f',
        '643d69a5c3f7b9001cfa0946',
        '643d69a5c3f7b9001cfa0949',
        '643d69a5c3f7b9001cfa0945',
        '643d69a5c3f7b9001cfa093c'
      ],
      status: 'done',
      name: 'Антарианский краторный бессмертный минеральный экзо-плантаго био-марсианский бургер',
      createdAt: '2024-09-02T07:36:55.648Z',
      updatedAt: '2024-09-02T07:36:56.126Z',
      number: 2
    },
    {
      _id: '3',
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa0943',
        '643d69a5c3f7b9001cfa093c'
      ],
      status: 'done',
      name: 'Краторный space бургер',
      createdAt: '2024-09-02T07:34:44.831Z',
      updatedAt: '2024-09-02T07:34:45.280Z',
      number: 3
    }
  ],
  total: 3,
  totalToday: 3
};

describe('Тестирование истории заказов', () => {
  test('Тест состояния запроса pending', () => {
    const testState = historySliceReducer(
      {
        ...initialState,
        error: 'Тестовая ошибка'
      },
      ordersHistory.pending('')
    );
    expect(testState).toEqual({
      orders: [],
      error: null,
      isLoading: true
    });
  });

  test('Тест установки данных после успешной загрузки', () => {
    const testState = historySliceReducer(
      {
        ...initialState,
        isLoading: true
      },
      ordersHistory.fulfilled(testOrders.orders, '')
    );

    expect(testState).toEqual({
      orders: testOrders.orders,
      error: null,
      isLoading: false
    });
  });

  test('Тест установки ошибки (error) состояния rejected', () => {
    const testError = new Error('Тестовая ошибка');
    const testState = historySliceReducer(
      {
        ...initialState,
        isLoading: true
      },
      ordersHistory.rejected(testError, '')
    );

    expect(testState).toEqual({
      orders: [],
      isLoading: false,
      error: 'Тестовая ошибка'
    });
  });
});
