import {createAsyncThunk} from "@reduxjs/toolkit";
import {IMyError, IProduct, IProductItem} from "../../types";
import {isAxiosError} from "axios";
import axiosApi from "../../axiosApi.ts";

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