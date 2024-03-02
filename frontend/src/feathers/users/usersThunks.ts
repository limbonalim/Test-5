import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';
import axiosApi from '../../axiosApi.ts';
import { ILoginForm, IMyError, IRegisterForm, IUser, IValidationError } from '../../types';
import { RootState } from '../../app/store.ts';
import { clearUser } from './usersSlice.ts';

export const register = createAsyncThunk<IUser, IRegisterForm, { rejectValue: IValidationError }>(
  'users/register',
  async (registerData, {rejectWithValue}) => {
    try {
      const response = await axiosApi.post<IUser>('/users', registerData);
      return response.data;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 422) {
        return rejectWithValue(e.response.data);
      }
      throw e;
    }
  }
);

export const login = createAsyncThunk<IUser, ILoginForm, { rejectValue: IMyError }>(
  'users/login',
  async (loginData, {rejectWithValue}) => {
    try {
      const response = await axiosApi.post<IUser>('/users/sessions', loginData);

      return response.data;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 422) {
        return rejectWithValue(e.response.data);
      }

      throw e;
    }
  }
);

export const logout = createAsyncThunk<void, void, {state: RootState }>(
  'users/logoutResponse',
  async (_, {getState, dispatch}) => {
    const token = getState().users.user?.token;
    await axiosApi.delete('/users/sessions', {headers: {'Authorization': `Barer ${token}`}});
    dispatch(clearUser());
  }
);