import Box from '@mui/material/Box';
import {Grid, Typography, Link, Alert} from '@mui/material';
import {NavLink as RouterLink, useParams} from 'react-router-dom'
import Loader from "../../components/UI/Loader/Loader.tsx";
import ProductItem from "./ProductItem.tsx";
import {category as navigationMenu} from "../../constants.ts";
import {useCallback, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectError, selectIsLoading, selectProducts} from "./productsSlice.ts";
import {getProducts} from "./productsThunks.ts";


const ProductsPage = () => {
  const [pageTitle, setPageTitle] = useState<string>('All items');
  const {category} = useParams();
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  const isLoading = useAppSelector(selectIsLoading);
  const error = useAppSelector(selectError);

  const getPageInfo = useCallback(async () => {
    if (category) {
      const index = navigationMenu.findIndex((item) => item.value === category);
      if (index >= 0) {
        setPageTitle(navigationMenu[index].title);
      }
      console.log(navigationMenu[index].value);
      await dispatch(getProducts(navigationMenu[index].value));
    } else {
      setPageTitle('All items');
      await dispatch(getProducts(null));
    }
  }, [category, dispatch])

  useEffect(() => {
    void getPageInfo();
  }, [getPageInfo]);

  const navLinks = navigationMenu.map((item) => (
    <li key={item.path}><Link to={item.path} component={RouterLink} color="inherit" sx={{textDecoration: 'none', fontSize: 25}}>{item.title}</Link></li>
  ));

  const render = products.map((item) => (
    <ProductItem key={item._id} _id={item._id} title={item.title} price={item.price} image={item.image}/>
  ));

  return (
    <Box sx={{display: 'flex', gap: 2, width: '100%'}}>
      <Box>
        <ul>
          {navLinks}
        </ul>
      </Box>
      <Box sx={{flexGrow: 1}}>
        <Typography variant="h2">{pageTitle}</Typography>
        {error && <Alert severity="warning" sx={{width: '100%'}}>{error.message}</Alert>}
        <Grid container spacing={1}>
          {isLoading? <Loader/> : render}
        </Grid>
      </Box>
    </Box>
  );
};

export default ProductsPage;