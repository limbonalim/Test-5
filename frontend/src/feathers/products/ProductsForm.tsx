import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import {
  Alert,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FileInput from '../../components/UI/FileInput/FileInput.tsx';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectUser } from '../users/usersSlice.ts';
import { createProduct } from './productsThunks.ts';
import { selectCreateError, selectIsCreateLoading } from './productsSlice.ts';
import {selectCategories} from "../categories/categoriesSlice.ts";
import {getCatgories} from "../categories/categoriesThunks.ts";

export interface IFormProducts {
  title: string;
  description: string;
  price: string;
  category: string;
  image: File | null;
}

const ProductsForm = () => {
  const [product, setProduct] = useState<IFormProducts>({
    title: '',
    description: '',
    price: '',
    category: '',
    image: null,
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  const isLoading = useAppSelector(selectIsCreateLoading);
  const error = useAppSelector(selectCreateError);
  const category = useAppSelector(selectCategories);

  const getCategoryInfo = async () => {
    await dispatch(getCatgories());
  };

  useEffect(() => {
    if (!user) {
      navigate('/');
    } else {
      void getCategoryInfo();
    }
  }, [user, dispatch]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const onChangeFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    setProduct(prev => ({
      ...prev,
      image: e.target.files ? e.target.files[0] : null
    }));
  };

  const changeCategory = (e: SelectChangeEvent<string>) => {
    const {value} = e.target;

    setProduct(prev => (
      {
        ...prev,
        category: value
      }
    ));
  };

  const getFieldError = () => {
    if (parseFloat(product.price) < 0) {
      return 'Price mast be upper than 0'
    } else {
      return undefined;
    }
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await dispatch(createProduct(product)).unwrap();
    navigate('/');
  };

  const selectItems = category.map((item) => (
    <MenuItem key={item._id} value={item._id}>{item.title}</MenuItem>
  ));

  return (
    <form onSubmit={onSubmit}>
      {error && <Alert severity="error" sx={{mb: 2}}>{error.message}</Alert>}
      <Grid container item direction="column" spacing={2}>
        <Grid item>
          <TextField
            sx={{
              width: '50%'
            }}
            label="Title"
            name="title"
            onChange={onChange}
            value={product.title}
            required
          />
        </Grid>
        <Grid item>
          <TextField
            required
            sx={{
              width: '50%'
            }}
            onChange={onChange}
            value={product.description}
            multiline
            rows={3}
            name="description"
            label="Description"
          />
        </Grid>
        <Grid item>
          <TextField
            required
            sx={{
              width: '50%'
            }}
            onChange={onChange}
            value={product.price}
            type="number"
            name="price"
            label="Price"
            error={Boolean(getFieldError())}
            helperText={getFieldError()}
          />
        </Grid>
        <Grid item>
          <FormControl fullWidth>
            <InputLabel id="select">Category</InputLabel>
            <Select
              labelId="select"
              id="select"
              required
              label="Category"
              name="category"
              defaultValue=""
              onChange={changeCategory}
              value={product.category}
            >
              {selectItems}
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <FileInput
            name="image"
            onChange={onChangeFileInput}
            label="Imeage"
          />
        </Grid>
        <Grid item>
          <Button type="submit" disabled={isLoading}>Add</Button>
        </Grid>
      </Grid>
    </form>
  );
};
export default ProductsForm;