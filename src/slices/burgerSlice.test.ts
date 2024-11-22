import {
  addIngredient,
  removeIngredient,
  moveUpIngredient,
  moveDownIngredient,
  clearOrder
} from './burgerSlice';
import burgerSliceReducer from './burgerSlice';
import { TConstructorIngredient } from '@utils-types';

describe('Тестирование редьюсера слайса конструктора бургера', () => {
  const sous: TConstructorIngredient = {
      id: '1',
      _id: '1',
      name: 'Соус Spicy-X',
      type: 'sauce',
      proteins: 30,
      fat: 20,
      carbohydrates: 40,
      calories: 30,
      price: 90,
      image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png'
    };

    const cutlet: TConstructorIngredient = {
      id: '2',
      _id: '2',
      name: 'Биокотлета из марсианской Магнолии',
      type: 'main',
      proteins: 420,
      fat: 142,
      carbohydrates: 242,
      calories: 4242,
      price: 424,
      image: 'https://code.s3.yandex.net/react/code/meat-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
    };

    const bread: TConstructorIngredient = {
      id: '3',
      _id: '3',
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
    };

    test('Тест добавления ингредиента в конструктор', () => {
      const initialState = {
        constructorItems: {
          bun: null,
          ingredients: []
        },
        orderRequest: false,
        orderModalData: null,
        isLoading: false,
        error: null
      };

      const newState = burgerSliceReducer(
        initialState,
        addIngredient(sous)
      );

      expect(newState.constructorItems.ingredients).toHaveLength(1);
      expect(newState.constructorItems.ingredients[0]).toEqual({
        ...sous,
        id: expect.any(String)
      });
    });

    test('Тест добавления булки в конструктор', () => {
      const initialState = {
        constructorItems: {
          bun: null,
          ingredients: []
        },
        orderRequest: false,
        orderModalData: null,
        isLoading: false,
        error: null
      };

      const newState = burgerSliceReducer(
        initialState,
        addIngredient(bread)
      );

      expect(newState.constructorItems.bun).toEqual({
        ...bread,
        id: expect.any(String)
      });
    });

    test('Тест удаления ингредиента', () => {
      const initialState = {
        constructorItems: {
          bun: bread,
          ingredients: [sous, cutlet]
        },
        orderRequest: false,
        orderModalData: null,
        isLoading: false,
        error: null
      };

      const newState = burgerSliceReducer(
        initialState,
        removeIngredient(sous)
      );

      expect(newState.constructorItems.ingredients).toHaveLength(1);
      expect(newState.constructorItems.ingredients[0]).toEqual({
        ...cutlet,
        id: expect.any(String)
      });
    });

    test('Тест изменения порядка ингредиентов в начинке(вверх)', () => {
      const initialState = {
        constructorItems: {
          bun: bread,
          ingredients: [sous, cutlet]
        },
        orderRequest: false,
        orderModalData: null,
        isLoading: false,
        error: null
      };

      const newState = burgerSliceReducer(
        initialState,
        moveUpIngredient(1)
      );

      expect(newState.constructorItems.ingredients[0]).toEqual({
        ...cutlet,
        id: expect.any(String)
      });

      expect(newState.constructorItems.ingredients[1]).toEqual({
        ...sous,
        id: expect.any(String)
      });
    });

    test('Тест изменения порядка ингредиентов в начинке(вниз)', () => {
      const initialState = {
        constructorItems: {
          bun: bread,
          ingredients: [sous, cutlet]
        },
        orderRequest: false,
        orderModalData: null,
        isLoading: false,
        error: null
      };

      const newState = burgerSliceReducer(
        initialState,
        moveDownIngredient(0)
      );

      expect(newState.constructorItems.ingredients[1]).toEqual({
        ...sous,
        id: expect.any(String)
      });

      expect(newState.constructorItems.ingredients[0]).toEqual({
        ...cutlet,
        id: expect.any(String)
      });
    });

    test('Тест очищения конструктора', () => {
      const initialState = {
        constructorItems: {
          bun: bread,
          ingredients: [sous, cutlet]
        },
        orderRequest: false,
        orderModalData: null,
        isLoading: false,
        error: null
      };

      const newState = burgerSliceReducer(initialState, clearOrder());

      expect(newState.constructorItems).toEqual({
        bun: null,
        ingredients: []
      });
    });
  });
