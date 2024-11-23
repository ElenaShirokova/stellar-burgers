import {
  getIngredients,
  TIngredientsState
} from './ingredientsSlice';
import ingredientsSliceReducer from './ingredientsSlice';

const initialState: TIngredientsState = {
  ingredients: [],
  isLoading: false,
  error: null
};

const testIngredient = [
  {
    _id: '1',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
  }
];

describe('Тестирование данных ингредиентов', () => {
  test('Тест состояния запроса pending', () => {
    const testState = ingredientsSliceReducer(
      {
        ...initialState,
        error: 'Тестовая ошибка'
      },
      getIngredients.pending('')
    );

    expect(testState).toEqual({
      ingredients: [],
      isLoading: true,
      error: null
    });
  });

  test('Тест установки данных после успешной загрузки', () => {
    const testState = ingredientsSliceReducer(
      {
        ...initialState,
        isLoading: true
      },
      getIngredients.fulfilled(testIngredient, '')
    );

    expect(testState).toEqual({
      ingredients: testIngredient,
      isLoading: false,
      error: null
    });
  });

  test('Тест установки ошибки (error) состояния rejected', () => {
    const testError = new Error('Тестовая ошибка');

    const testState = ingredientsSliceReducer(
      {
        ...initialState,
        isLoading: true
      },

      getIngredients.rejected(testError, '')
    );

    expect(testState).toEqual({
      ingredients: [],
      isLoading: false,
      error: 'Тестовая ошибка'
    });
  });
});
