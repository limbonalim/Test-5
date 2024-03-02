import { useCallback, useEffect } from 'react';
import { Typography, Box, Button, Alert } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import {
  selectCurrentError,
  selectCurrentProduct, selectDeleteError,
  selectIsCurrentLoading,
  selectIsDeleteLoading
} from './productsSlice.ts';
import { deleteProduct, getProduct } from './productsThunks.ts';
import { selectUser } from '../users/usersSlice.ts';
import { BASE_URL } from '../../constants.ts';
import Loader from '../../components/UI/Loader/Loader.tsx';

const ProductPage = () => {
  const product = useAppSelector(selectCurrentProduct);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const isLoading = useAppSelector(selectIsCurrentLoading);
  const error = useAppSelector(selectCurrentError);
  const isDeleteLoading = useAppSelector(selectIsDeleteLoading);
  const deleteError = useAppSelector(selectDeleteError);
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

  const handleDelete = useCallback(async () => {
    if (product) {
      await dispatch(deleteProduct(product._id)).unwrap();
      navigate('/');
    }
  }, [id, dispatch]);

  if (user && user._id === product?.user._id) {
    deleteButton = (
      <Button variant="outlined" disabled={isDeleteLoading} onClick={handleDelete} startIcon={<DeleteIcon/>}>
        Delete
      </Button>
    );
  }

  return isLoading? <Loader/> : (
    <Box>
      {error && <Alert severity="error">{error.message}</Alert>}
      {deleteError && <Alert severity="warning">{deleteError.message}</Alert>}
      <Box>
        <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 3}}>
          <Box>
            <Typography color="gray">{product?.category.title}</Typography>
            <Typography variant="h3">{product?.title}</Typography>
            <Box sx={{mb: 2}}>{<img style={{maxWidth: '450px'}} src={product ? BASE_URL + '/' + product?.image : ''} alt={product?.title}/>}</Box>
            <Typography sx={{flexGrow: 1}}>{product?.description}</Typography>
          </Box>
          <Box sx={{display: 'flex', flexDirection: 'column', gap: 1, mb: 2}}>
            <Typography variant="h5">Имя: {product?.user.displayName}</Typography>
            <Typography variant="h5">Телефон: {product?.user.phone}</Typography>
          </Box>
        </Box>
        {deleteButton}
      </Box>
    </Box>
  );
};

export default ProductPage;