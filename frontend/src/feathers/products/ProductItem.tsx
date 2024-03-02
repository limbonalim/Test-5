import React from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { BASE_URL } from '../../constants.ts';
import type { IProductItem } from '../../types';


const ProductItem: React.FC<IProductItem> = ({_id, title, price, image}) => {
  const path = `/product/${_id}`;
  const photo = BASE_URL + '/' + image;
  return (
    <Grid item>
      <Link to={path} component={RouterLink} sx={{textDecoration: 'none', color: 'inherit'}}>
        <Card sx={{maxWidth: 345}}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image={photo}
              alt={title}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Price: {price} KGS
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Link>
    </Grid>
  );
};

export default ProductItem;