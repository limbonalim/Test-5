import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store.ts';
import { getProduct, getProducts } from './productsThunks.ts';
import type { IMyError, IProduct, IProductItem } from '../../types';

interface IProductsState {
  products: IProductItem[];
  isLoading: boolean;
  error: IMyError | null;
  currentProduct: IProduct | null;
  isCurrentLoading: boolean;
  currentError: IMyError | null;
}

const initialState: IProductsState = {
  products: [],
  isLoading: false,
  error: null,
  currentProduct: null,
  isCurrentLoading: false,
  currentError: null
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getProducts.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.products = [];
    }).addCase(getProducts.fulfilled, (state, {payload: products}) => {
      state.isLoading = false;
      state.products = products;
    }).addCase(getProducts.rejected, (state, {payload: error}) => {
      state.isLoading = false;
      state.error = error || null;
    });

    builder.addCase(getProduct.pending, (state) => {
      state.isCurrentLoading = true;
      state.currentError = null;
      state.currentProduct = null;
    }).addCase(getProduct.fulfilled, (state, {payload: product}) => {
      state.isCurrentLoading = false;
      state.currentProduct = product;
    }).addCase(getProduct.rejected, (state, {payload: error}) => {
      state.isCurrentLoading = false;
      state.currentError = error || null;
    });
  }
});

export const selectProducts = (state: RootState) => state.products.products;
export const selectIsLoading = (state: RootState) => state.products.isLoading;
export const selectError = (state: RootState) => state.products.error;
export const selectCurrentProduct = (state: RootState) => state.products.currentProduct;
export const selectIsCurrentLoading = (state: RootState) => state.products.isCurrentLoading;
export const selectCurrentError = (state: RootState) => state.products.currentError;

export const productsReducer = productsSlice.reducer;