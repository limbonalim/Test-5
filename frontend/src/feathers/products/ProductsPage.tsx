import Box from '@mui/material/Box';
import { Grid, Typography, Link } from '@mui/material';
import {NavLink as RouterLink, useParams} from 'react-router-dom'
import {category as navigationMenu} from "../../constants.ts";
import {useEffect, useState} from "react";


const ProductsPage = () => {
  const [pageTitle, setPageTitle] = useState<string>('All items');
  const {category} = useParams();

  useEffect(() => {
    if (category) {
      const index = navigationMenu.findIndex((item) => item.value === category);
      if (index >= 0) {
        setPageTitle(navigationMenu[index].title);
      }
    } else {
      setPageTitle('All items');
    }
  }, [category]);

  const navLinks = navigationMenu.map((item) => (
    <li key={item.path}><Link to={item.path} component={RouterLink} color="inherit" sx={{textDecoration: 'none', fontSize: 25}}>{item.title}</Link></li>
  ));

  return (
    <Box sx={{display: 'flex', gap: 2}}>
      <Box>
        <ul>
          {navLinks}
        </ul>
      </Box>
      <Box>
        <Typography variant="h2">{pageTitle}</Typography>
        <Grid container>

        </Grid>
      </Box>
    </Box>
  );
};

export default ProductsPage;