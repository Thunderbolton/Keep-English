import { Button, Container } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <>
    <Container maxWidth={false} disableGutters>
      <Box>
        <AppBar color='transparent' position='static'>
          <Toolbar>
            <Typography variant="h3" sx={{ paddingLeft: '12%', marginLeft: 'auto', fontSize: 'clamp(1rem, 1.7rem, 2rem)' }}><Link to='/' style={{ color: 'inherit', textDecoration: 'inherit'}}>Keep English</Link>
            </Typography>
            <ul style={{marginLeft: 'auto', display: 'flex', flexWrap: 'nowrap'}}>
              <Button 
              sx={{marginLeft: '0px'}} 
              variant="outlined" 
              color="success">
                <Link to='/signin' 
                style={{ textDecoration: 'none', color: 'green', fontSize: 'clamp(0.2rem, 0.8rem, 1.5rem)' }}>SIGN IN</Link>
                </Button>
              <Button 
              sx={{marginLeft: '0.7rem', fontSize: 'clamp(0.2rem, 0.8rem, 1.5rem)'}} 
              variant="contained" 
              color="success">
                <Link to='/register' 
                style={{ textDecoration: 'none', color: 'white' }}>REGISTER</Link>
                </Button>
            </ul>
          </Toolbar>
        </AppBar>
      </Box>
    </Container>
    
    </>
  );
}

export default Header