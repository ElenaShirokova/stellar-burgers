import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi, getOrderByNumberApi } from '../utils/burger-api';
import { TOrder } from '@utils-types';

export type TStateFeed = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  error: null | string;
  isLoading: boolean;
  modalOrder: TOrder | null;
};

const initialState: TStateFeed = {
  orders: [],
  total: 0,
  totalToday: 0,
  error: null,
  isLoading: false,
  modalOrder: null
};

export const getFeeds = createAsyncThunk('feed/data', getFeedsApi);

export const getOrderByNumber = createAsyncThunk(
  'feed/getOrder',
  async (number: number, { rejectWithValue }) => {
    try {
      const response = await getOrderByNumberApi(number);
      return response;
    } catch (error) {
      return rejectWithValue('Не удалось получить данные заказа');
    }
  }
);

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
        state.isLoading = false;
      })
      .addCase(getFeeds.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.error.message || 'Не удалось получить данные заказа';
      })
      .addCase(getOrderByNumber.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.isLoading = false;
        state.modalOrder = action.payload.orders[0];
      })
      .addCase(getOrderByNumber.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.error.message || 'Не удалось получить данные заказа';
      });
  },
  selectors: {
    ordersSelector: (state) => state.orders,
    totalSelector: (state) => state.total,
    totalTodaySelector: (state) => state.totalToday,
    loadingSelector: (state) => state.isLoading
  }
});

export const {
  ordersSelector,
  totalSelector,
  totalTodaySelector,
  loadingSelector
} = feedSlice.selectors;

export default feedSlice.reducer;
