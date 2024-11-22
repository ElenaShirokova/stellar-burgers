import {
  TStateFeed,
  getFeeds,
  getOrderByNumber,
} from './feedSlice';
import feedSliceReducer from './feedSlice';

const initialState: TStateFeed = {
  orders: [],
  total: 0,
  totalToday: 0,
  error: null,
  isLoading: false,
  modalOrder: null
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

describe('Тестирование данных подачи бургера', () => {
  test('Тест состояния запроса pending', () => {
    const testState = feedSliceReducer(
      {
        ...initialState,
        error: 'Тестовая ошибка'
      },
      getFeeds.pending('')
    );
    expect(testState).toEqual({
      orders: [],
      total: 0,
      totalToday: 0,
      error: null,
      isLoading: true,
      modalOrder: null
    });
  });

  test('Тест установки данных после успешной загрузки', () => {
    const testState = feedSliceReducer(
      {
        ...initialState,
        isLoading: true
      },
      getFeeds.fulfilled(testOrders, '')
    );

    expect(testState).toEqual({
      orders: testOrders.orders,
      total: testOrders.total,
      totalToday: testOrders.totalToday,
      error: null,
      isLoading: false,
      modalOrder: null
    });
  });

  test('Тест установки ошибки (error) состояния rejected', () => {
    const testError = new Error('Тестовая ошибка');
    const testState = feedSliceReducer(
      {
        ...initialState,
        isLoading: true
      },
      getFeeds.rejected(testError, '')
    );

    expect(testState).toEqual({
      orders: [],
      total: 0,
      totalToday: 0,
      modalOrder: null,
      isLoading: false,
      error: 'Тестовая ошибка'
    });
  });

  test('Тест состояния pending при запросе заказа по номеру', () => {
    const testState = feedSliceReducer(
      {
        ...initialState,
        error: 'Тестовая ошибка'
      },
      getOrderByNumber.pending('1', 1)
    );
    expect(testState).toEqual({
      orders: [],
      total: 0,
      totalToday: 0,
      error: null,
      isLoading: true,
      modalOrder: null
    });
  });

  test('Тест установки данных заказа в modalOrder после успешной загрузки', () => {
    const testState = feedSliceReducer(
      {
        ...initialState,
        isLoading: true
      },
      getOrderByNumber.fulfilled(testOrders, '1', 1)
    );

    expect(testState).toEqual({
      orders: [],
      total: 0,
      totalToday: 0,
      error: null,
      isLoading: false,
      modalOrder: testOrders.orders[0]
    });
  });

  test('Тест установки ошибки (error) состояния rejected при отказе в получении заказа', () => {
    const testError = new Error('Тестовая ошибка');
    const testState = feedSliceReducer(
      {
        ...initialState,
        isLoading: true
      },
      getOrderByNumber.rejected(testError, '1', 1)
    );

    expect(testState).toEqual({
      orders: [],
      total: 0,
      totalToday: 0,
      modalOrder: null,
      isLoading: false,
      error: 'Тестовая ошибка'
    });
  });
});
