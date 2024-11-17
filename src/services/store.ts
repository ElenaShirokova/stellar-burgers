import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userSliceReducer from '../slices/userSlice';
import ingredientsSliceReducer from '../slices/ingredientsSlice';
import burgerSliceReducer from '../slices/burgerSlice';
import feedSliceReducer from '../slices/feedSlice';
import historySliceReducer from '../slices/userHistorySlice';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

const rootReducer = combineReducers({
  user: userSliceReducer,
  ingredients: ingredientsSliceReducer,
  burger: burgerSliceReducer,
  feed: feedSliceReducer,
  history: historySliceReducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
