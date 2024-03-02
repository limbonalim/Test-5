import {useCallback, useEffect} from 'react';
import Box from '@mui/material/Box';
import {Link} from "@mui/material";
import {NavLink as RouterLink} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectCategories} from "./categoriesSlice.ts";
import {getCatgories} from "./categoriesThunks.ts";

const Categories = () => {
  const menu = useAppSelector(selectCategories);
  const dispatch = useAppDispatch();

  const getCategoriesInfo = useCallback(async () => {
    await dispatch(getCatgories()).unwrap();
  }, [dispatch])

  useEffect(() => {
    void getCategoriesInfo;
  }, [getCategoriesInfo]);

  const navLinks = menu.map((item) => (
    <li key={item._id}><Link to={`/products/${item._id}`} component={RouterLink} color="inherit"
                             sx={{textDecoration: 'none', fontSize: 25}}>{item.title}</Link></li>
  ));

  return (
    <Box>
      <ul className='navList'>
        {navLinks}
      </ul>
    </Box>
  );
};

export default Categories;