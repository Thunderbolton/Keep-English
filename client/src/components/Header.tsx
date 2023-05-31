import { SignOut } from './SignOut';
import { Link } from 'react-router-dom';
import { Avatar, Button, Container } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { AuthContext } from "../context/AuthContext";
import { useContext, useEffect, useState } from 'react';
import { deepOrange } from '@mui/material/colors';



const Header = () => {

  // Signing users out of the site
  const { signout } = SignOut() 

  const handleSignOut = () => {
    signout()
  }

  const { user } = useContext(AuthContext)

  const [welcome, setWelcome] = useState('')
  const [avatar, setAvatar] = useState(false)

  useEffect(() => {
    if (user) {
      setWelcome(`Welcome back, ${user.name}`);
      setAvatar(false);
  
      const welcomeTimer = setTimeout(() => {
        setWelcome('');
        setAvatar(true);
      }, 4000);
  
      return () => clearTimeout(welcomeTimer);
    } else {
      setWelcome('');
      setAvatar(false);
    }
  }, [user]);

  return (
    <>
    <Container maxWidth={false} disableGutters>
      <Box display="flex" justifyContent="center">
        <AppBar color='transparent' position='static'>
          <Toolbar>
            <Link to="/">
              <HomeIcon sx={{color: 'green'}} />
            </Link>
            <Typography 
            variant="h3" 
            sx={{ 
              // border:'2px solid red', 
              marginLeft: 'auto', 
              marginRight: 'auto', 
              display: 'flex', 
              alignItems: 'center',
              justifyContent: 'center',
              flexGrow: 1, 
              fontSize: 'clamp(1rem, 1.7rem, 2rem)' }}>
                <Link to='/' 
                style={{ color: 'inherit', textDecoration: 'inherit'}}>Keep English</Link>
            </Typography>
            <ul style={{marginLeft: 'auto', display: 'flex', flexWrap: 'nowrap'}}>
            {user && (
            <>  
              <p>{welcome}</p>
              {avatar ? <Avatar sx={{ bgcolor: deepOrange[500] }}>{user.name.charAt(0).toUpperCase()}</Avatar> : null}
              <Button 
                sx={{marginLeft: '0.7rem', fontSize: 'clamp(0.2rem, 0.8rem, 1.5rem)'}}  
                variant="outlined" 
                color="success"
                onClick={handleSignOut}
                >
                  SIGN OUT
              </Button>
            </>)}
            {!user && (
            <>
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
              </>)}
            </ul>
          </Toolbar>
        </AppBar>
      </Box>
    </Container>
    </>
  );
}

export default Header