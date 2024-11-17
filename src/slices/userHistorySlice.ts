import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getOrdersApi } from '../utils/burger-api';
import { TOrder } from '@utils-types';

export type TStateOrdersHistory = {
  orders: TOrder[];
  isLoading: boolean;
  error: null | string | undefined;
};

const initialState: TStateOrdersHistory = {
  orders: [],
  isLoading: false,
  error: null
};

export const ordersHistory = createAsyncThunk(
  'user/orderHistory',
  getOrdersApi
);

export const userHistorySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(ordersHistory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(ordersHistory.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(ordersHistory.rejected, (state, action) => {
        state.error =
          action.error.message || 'Не удалось получить историю заказов';
        state.isLoading = false;
      });
  },
  selectors: {
    ordersHistorySlice: (state) => state.orders,
    isLoadingSlice: (state) => state.isLoading
  }
});

export default userHistorySlice.reducer;

export const { ordersHistorySlice, isLoadingSlice } =
  userHistorySlice.selectors;
