import Box from '@mui/material/Box';
import { Grid, Typography, Alert } from '@mui/material';
import {  useParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import Loader from '../../components/UI/Loader/Loader.tsx';
import ProductItem from './ProductItem.tsx';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectError, selectIsLoading, selectProducts } from './productsSlice.ts';
import { getProducts } from './productsThunks.ts';
import { selectCategories } from '../categories/categoriesSlice.ts';
import './products.css';
import Categories from "../categories/Categories.tsx";


const ProductsPage = () => {
  const [pageTitle, setPageTitle] = useState<string>('All items');
  const {category} = useParams();
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  const isLoading = useAppSelector(selectIsLoading);
  const error = useAppSelector(selectError);
  const menu = useAppSelector(selectCategories)

  const getPageInfo = useCallback(async () => {
    if (category) {
      const index = menu.findIndex((item) => item._id === category);
      if (index >= 0) {
        setPageTitle(menu[index].title);
      }
      await dispatch(getProducts(menu[index]._id));
    } else {
      setPageTitle('All items');
      await dispatch(getProducts(null));
    }
  }, [category, dispatch]);

  useEffect(() => {
    void getPageInfo();
  }, [getPageInfo]);

  const render = products.map((item) => (
    <ProductItem key={item._id} _id={item._id} title={item.title} price={item.price} image={item.image}/>
  ));

  return (
    <Box sx={{display: 'flex', gap: 2, width: '100%'}}>
      <Categories/>
      <Box sx={{flexGrow: 1}}>
        <Typography variant="h2">{pageTitle}</Typography>
        {error && <Alert severity="warning" sx={{width: '100%'}}>{error.message}</Alert>}
        <Grid container spacing={1}>
          {isLoading ? <Loader/> : render}
        </Grid>
      </Box>
    </Box>
  );
};

export default ProductsPage;