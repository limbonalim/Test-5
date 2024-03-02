import { createSlice } from '@reduxjs/toolkit';
import { ICategory } from '../../types';
import {getCatgories} from "./categoriesThunks.ts";
import {RootState} from "../../app/store.ts";

interface ICategoriesState {
  categories: ICategory[];
  isLoading: boolean;
}

const initialState: ICategoriesState = {
  categories: [],
  isLoading: false
}

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getCatgories.pending, (state) => {
      state.isLoading = true;
      state.categories = [];
    }).addCase(getCatgories.fulfilled, (state, {payload: categories}) => {
      state.isLoading = false;
      state.categories = categories;
    }).addCase(getCatgories.rejected, (state) => {
      state.isLoading = false;
    })
  }
});

export const selectCategories = (state: RootState) => state.categories.categories;
export const selectIsLoading = (state: RootState) => state.categories.isLoading;

export const categoriesReducer = categoriesSlice.reducer;