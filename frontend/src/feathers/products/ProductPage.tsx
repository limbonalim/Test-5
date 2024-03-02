import { useCallback, useEffect } from 'react';
import { Typography, Box, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectCurrentProduct } from './productsSlice.ts';
import { deleteProduct, getProduct } from './productsThunks.ts';
import { selectUser } from '../users/usersSlice.ts';
import { BASE_URL } from '../../constants.ts';

const ProductPage = () => {
  const product = useAppSelector(selectCurrentProduct);
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const {id} = useParams();
  let deleteButton;

  const getPageInfo = useCallback(async () => {
    if (id) {
      await dispatch(getProduct(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    void getPageInfo();
  }, [getPageInfo]);

  const handleDelete = useCallback(() => {
    if (product) {
      dispatch(deleteProduct(product._id));
    }
  }, [id, dispatch]);

  if (user?._id === product?.user._id) {
    deleteButton = (
      <Button variant="outlined" onClick={handleDelete} startIcon={<DeleteIcon/>}>
        Delete
      </Button>
    );
  }

  return (
    <Box>
      <Box>
        <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 3}}>
          <Box>
            <Typography color="gray">{product?.category}</Typography>
            <Typography variant="h3">{product?.title}</Typography>
            <Box sx={{mb: 2}}>{<img src={product ? BASE_URL + '/' + product?.image : ''} alt={product?.title}/>}</Box>
            <Typography sx={{flexGrow: 1}}>{product?.description}</Typography>
          </Box>
          <Box sx={{display: 'flex', gap: 1, mb: 2}}>
            <Typography variant="h5">{product?.user.displayName}</Typography>
            <Typography variant="h5">{product?.user.phone}</Typography>
          </Box>
        </Box>
        {deleteButton}
      </Box>
    </Box>
  );
};

export default ProductPage;