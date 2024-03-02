import {useEffect} from 'react';
import {Typography, Box, Button} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {BASE_URL} from "../../constants.ts";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectCurrentProduct} from "./productsSlice.ts";
import {deleteProduct, getProduct} from "./productsThunks.ts";
import {useNavigate, useParams} from "react-router-dom";
import {selectUser} from "../users/usersSlice.ts";

const ProductPage = () => {
  const product = useAppSelector(selectCurrentProduct);
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();
  const {id} = useParams();
  let deleteButton;

  useEffect(() => {
    if (id) {
      dispatch(getProduct(id)).unwrap();
      navigate('/');
    }
  }, [id, dispatch]);

  const handleDelete = () => {
    if (product) {
      dispatch(deleteProduct(product._id));
    }
  };

  if (user?._id === product?.user._id) {
    deleteButton = (
      <Button variant="outlined" onClick={handleDelete} startIcon={<DeleteIcon />}>
        Delete
      </Button>
    )
  }

  return (
    <Box>
      <Box>
        <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 3}}>
          <Box>
            <Typography color='gray'>{product?.category}</Typography>
            <Typography variant="h3">{product?.title}</Typography>
            <Box sx={{mb: 2}}>{<img src={BASE_URL + '/' + product?.image} alt={product?.title}/>}</Box>
            <Typography sx={{flexGrow: 1}}>{product?.description}</Typography>
          </Box>
          <Box sx={{display: 'flex', gap: 1, mb: 2}}>
            <Typography variant='h5'>{product?.user.displayName}</Typography>
            <Typography variant='h5'>{product?.user.phone}</Typography>
          </Box>
        </Box>
        {deleteButton}
      </Box>
    </Box>
  );
};

export default ProductPage;