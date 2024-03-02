import {createAsyncThunk} from "@reduxjs/toolkit";
import {IMyError, IProduct, IProductItem} from "../../types";
import {isAxiosError} from "axios";
import axiosApi from "../../axiosApi.ts";
import {RootState} from "../../app/store.ts";
import {IFormProducts} from "./ProductsForm.tsx";

export const getProducts = createAsyncThunk<IProductItem[], string | null, {rejectValue: IMyError}>(
  'products/getProducts',
  async (category, {rejectWithValue}) => {
    try {
      let response;
      if (category) {
        response = await axiosApi.get<IProductItem[]>(`/products?category=${category}`);
      } else {
        response = await axiosApi.get<IProductItem[]>('/products');
      }
      return response.data;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 404) {
        return rejectWithValue(e.response.data);
      }
      throw e;
    }
  }
);

export const getProduct = createAsyncThunk<IProduct, string, {rejectValue: IMyError}>(
  'products/getProduct',
  async (id, {rejectWithValue}) => {
    try {
      const response = await axiosApi.get<IProduct>(`/products/${id}`);
      return response.data;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 404) {
        return rejectWithValue(e.response.data);
      }
      throw e;
    }
  }
);

export const deleteProduct = createAsyncThunk<void, string, {rejectValue: IMyError, state: RootState}>(
  'products/deleteProduct',
  async (id, {rejectWithValue, dispatch, getState}) => {
    try {
      const token = getState().users?.user?.token
      await axiosApi.delete(`/products/${id}`, {headers: {'Authorization': `Barer ${token}`}});
      await dispatch(getProducts(null));
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 403) {
        return rejectWithValue(e.response.data);
      }
      if (isAxiosError(e) && e.response && e.response.status === 404) {
        return rejectWithValue(e.response.data);
      }
      throw e;
    }
  }
);

export const createProduct = createAsyncThunk<void, IFormProducts, {rejectValue: IMyError, state: RootState}>(
  'products/createProduct',
  async (data, {rejectWithValue, dispatch, getState}) => {
    try {
      const postData = new FormData();
      postData.append('title', data.title);
      postData.append('description', data.description);
      postData.append('price', data.price);
      if (data.image) {
        postData.append('image', data.image);
      }
      postData.append('category', data.category);

      const token = getState().users?.user?.token
      await axiosApi.post(`/products`, postData,{headers: {'Authorization': `Barer ${token}`}});
      await dispatch(getProducts(null));
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 403) {
        return rejectWithValue(e.response.data);
      }
      if (isAxiosError(e) && e.response && e.response.status === 404) {
        return rejectWithValue(e.response.data);
      }
      throw e;
    }
  }
);