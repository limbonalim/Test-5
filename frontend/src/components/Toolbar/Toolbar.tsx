import { Grid, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import UserMenu from './UserMenu.tsx';
import AnonymousMenu from './AnonymousMenu.tsx';
import { useAppSelector } from '../../app/hooks.ts';
import { selectUser } from '../../feathers/users/usersSlice.ts';

const Toolbar = () => {
  const user = useAppSelector(selectUser);
  return (
    <Grid container sx={{justifyContent: 'space-between', flexWrap: 'nowrap'}}>
      <Grid item>
        <Link to="/" component={RouterLink} color="inherit" sx={{textDecoration: 'none', fontSize: 25}}>Reddit</Link>
      </Grid>
      {user ? (<UserMenu user={user}/>) : (<AnonymousMenu/>)}
    </Grid>
  );
};

export default Toolbar;