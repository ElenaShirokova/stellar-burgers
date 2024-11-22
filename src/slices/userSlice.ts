import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  TLoginData,
  TRegisterData,
  loginUserApi,
  getUserApi,
  registerUserApi,
  updateUserApi,
  logoutApi
} from '../utils/burger-api';
import { getCookie, setCookie, deleteCookie } from '../utils/cookie';
import { TUser } from '@utils-types';

interface TUserState {
  isAuthChecked: boolean;
  isAuthenticated: boolean;
  dataUser: TUser | null;
  loginUserError: string | null;
  loginUserRequest: boolean;
}

const initialState: TUserState = {
  isAuthChecked: false,
  isAuthenticated: false,
  dataUser: null,
  loginUserError: null,
  loginUserRequest: false
};

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async ({ email, password }: TLoginData) => {
    const data = await loginUserApi({ email, password });
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data.user;
  }
);

export const getUser = createAsyncThunk('user/getUser', getUserApi);

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async ({ email, password, name }: TRegisterData) => {
    const data = await registerUserApi({ email, password, name });
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data.user;
  }
);

export const updateUser = createAsyncThunk('user/updateUser', updateUserApi);

export const logoutUser = createAsyncThunk(
  'user/logout',
  async (_, { rejectWithValue }) => {
    try {
      await logoutApi();
      deleteCookie('accessToken');
      localStorage.clear();
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authChecked: (state) => {
      state.isAuthChecked = true;
    }
  },
  selectors: {
    isAuthCheckedSelector: (state) => state.isAuthChecked,
    isAuthenticatedSelector: (state) => state.isAuthenticated,
    userDataSelector: (state) => state.dataUser,
    loginUserRequestSelector: (state) => state.loginUserRequest
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loginUserRequest = true;
        state.loginUserError = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginUserRequest = false;
        state.loginUserError = action.error.message || '';
        state.isAuthChecked = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.dataUser = action.payload;
        state.loginUserRequest = false;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
      })
      .addCase(getUser.pending, (state) => {
        state.isAuthenticated = false;
        state.loginUserError = null;
        state.dataUser = null;
        state.loginUserRequest = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.dataUser = action.payload.user;
        state.isAuthChecked = true;
        state.loginUserRequest = false;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loginUserError =
          action.error.message || 'Не удалось получить данные пользователя';
        state.isAuthenticated = false;
        state.dataUser = null;
        state.isAuthChecked = true;
        state.loginUserRequest = false;
      })
      .addCase(registerUser.pending, (state) => {
        state.isAuthenticated = false;
        state.dataUser = null;
        state.loginUserRequest = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.dataUser = action.payload;
        state.loginUserRequest = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.loginUserError =
          action.error.message ||
          'Не удалось зарегистрировать пользователя, попробуйте еще раз';
        state.loginUserRequest = false;
      })
      .addCase(logoutUser.pending, (state) => {
        state.isAuthenticated = true;
        state.loginUserRequest = true;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.isAuthenticated = false;
        state.loginUserRequest = false;
        state.dataUser = null;
        deleteCookie('accessToken');
        localStorage.removeItem('refreshToken');
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.loginUserRequest = false;
        state.loginUserError = action.error.message || 'Пользователь не найден';
      })
      .addCase(updateUser.pending, (state) => {
        state.isAuthenticated = true;
        state.loginUserRequest = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.dataUser = action.payload.user;
        state.loginUserRequest = false;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loginUserError =
          action.error.message || 'Не удалось обновить данные пользователя';
        state.loginUserRequest = false;
      });
  }
});

export const checkUserAuth = createAsyncThunk(
  'user/checkUser',
  (_, { dispatch }) => {
    if (getCookie('accessToken')) {
      dispatch(getUser()).finally(() => {
        dispatch(authChecked());
      });
    } else {
      dispatch(authChecked());
    }
  }
);

export const { authChecked } = userSlice.actions;

export const {
  isAuthCheckedSelector,
  isAuthenticatedSelector,
  userDataSelector,
  loginUserRequestSelector
} = userSlice.selectors;

export default userSlice.reducer;
