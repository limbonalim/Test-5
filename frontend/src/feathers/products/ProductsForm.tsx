import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import { useAppDispatch } from "../../app/hooks";
import {useNavigate} from "react-router-dom";
import {useAppSelector} from "../../app/hooks.ts";
import {selectUser} from "../users/usersSlice.ts";
import {Button, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField} from "@mui/material";
import FileInput from "../../components/UI/FileInput/FileInput.tsx";
import {category} from "../../constants.ts";
import {createProduct} from "./productsThunks.ts";

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

  useEffect(() => {
    if (!user) {
      navigate('/');
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
    const { value} = e.target;

    setProduct(prev => (
      {...prev,
        category: value
      }
    ));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    dispatch(createProduct(product)).unwrap();
    navigate('/');
  };

  const selectItems = category.map((item) => (
    <MenuItem key={item.value} value={item.value}>{item.title}</MenuItem>
  ))

  return (
    <form onSubmit={onSubmit}>
      {/*{error && <Alert severity="error">{error.message}</Alert>}*/}
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
            type='number'
            name="price"
            label="Price"
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
              defaultValue=''
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
          <Button type="submit">Add</Button>
        </Grid>
      </Grid>
    </form>
  );
};
export default ProductsForm;