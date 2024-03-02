import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.ts';
import type { ICategory } from '../../types';

export const getCatgories = createAsyncThunk<ICategory[]>(
  'catgories/getCatgories',
  async () => {
    const response = await axiosApi.get<ICategory[]>('/categories');
    return response.data;
  }
)