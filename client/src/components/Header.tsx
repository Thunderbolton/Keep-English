import { SignOut } from './SignOut';
import { Link } from 'react-router-dom';
import { Avatar, Button, Container, IconButton, Tooltip } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { AuthContext } from "../context/AuthContext";
import { useContext, useEffect, useState } from 'react';
import { deepOrange } from '@mui/material/colors';
import useMediaQuery from '@mui/material/useMediaQuery';

const Header = () => {

  // Signing users out of the site
  const { signout } = SignOut() 

  const handleSignOut = () => {
    signout()
  }

  const { user } = useContext(AuthContext)

  const [welcome, setWelcome] = useState('')
  const [avatar, setAvatar] = useState(true)

  const isSmallScreen = useMediaQuery('(max-width: 600px)');
  const isMedScreen = useMediaQuery('(max-width: 900px)');

  const headerButtonStyle = {
    marginLeft: '0.7rem',
    fontSize: 'clamp(0.2rem, 0.8rem, 1.5rem)',
  };

  useEffect(() => {
    if (user && !isSmallScreen && !isMedScreen) {
      setWelcome(`Welcome back, ${user.name}`);
      setAvatar(false);
    
      const welcomeTimer = setTimeout(() => {
        setWelcome('');
        setAvatar(true);
      }, 1000);
   
      return () => clearTimeout(welcomeTimer);

    } else if (isSmallScreen || isMedScreen) {
      setWelcome('');
      setAvatar(true);
      
    } else {
      setWelcome('');
      setAvatar(true);
    }
  }, [user]);

  return (
    <>
    <Container maxWidth={false} disableGutters>
      <Box display="flex" justifyContent="center" alignItems="center">
        <AppBar color='transparent' position='static' sx={{ height: '70px'}}>
          <Toolbar>
            <Link to="/">
              <HomeIcon sx={{color: 'green', position: 'absolute', bottom: '30%' }} />
            </Link>
            <Typography 
            variant="h3" 
            sx={{ 
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              fontSize: 'clamp(1rem, 1.7rem, 2rem)',
              }}>
                <Link to='/' 
                style={{ color: 'inherit', textDecoration: 'inherit' }}>Keep English</Link>
            </Typography>

            <ul style={{marginLeft: 'auto', display: 'flex', flexWrap: 'nowrap'}}>
            {user && !isSmallScreen && (
            <>  
              <span className='welcome-message'>{welcome}</span>
              {avatar ? (
              <>
                <Avatar sx={{ bgcolor: deepOrange[500], position: 'absolute', right: '120px', bottom: '15%' }}>{user.name.charAt(0).toUpperCase()}</Avatar>
                <Button 
                  sx={{headerButtonStyle, position: 'absolute', right: '15px', bottom: '18%' }}  
                  variant="outlined" 
                  color="success"
                  onClick={handleSignOut}>
                    SIGN OUT
                </Button>
              </>) : null}
            </>
            )}

            {!user && !isSmallScreen && (
            <>
              <Button 
                sx={{marginLeft: '0px'}} 
                variant="outlined" 
                color="success">
                <Link to='/signin' 
                  style={{ textDecoration: 'none', color: 'green', fontSize: 'clamp(0.2rem, 0.8rem, 1.5rem)' }}>SIGN IN</Link>
                </Button>
              <Button 
                sx={headerButtonStyle} 
                variant="contained" 
                color="success">
                  <Link to='/register' 
                  style={{ textDecoration: 'none', color: 'white' }}>REGISTER</Link>
              </Button>
              </>)}  
              
              {isSmallScreen && !user && (
              <>
                <Tooltip title="Sign in">
                  <IconButton size="small" aria-label="login" component="label" color="inherit" >
                    <Link to='/signin'> 
                      <LoginIcon color="warning"/>
                    </Link>  
                  </IconButton>
                </Tooltip>
                <Tooltip title="Register">
                  <IconButton size="small" aria-label="add-person" component="label">
                    <Link to='/register'>
                    <PersonAddAlt1Icon color="primary"/>
                    </Link> 
                  </IconButton>
                </Tooltip>
              </>
              )}
              
              {isSmallScreen && user && avatar && (
                <>
                  <Avatar sx={{ bgcolor: deepOrange[500] }}>{user.name.charAt(0).toUpperCase()}</Avatar>
                  <Tooltip title="Sign out">
                    <IconButton
                      onClick={handleSignOut}>
                    <LogoutIcon />
                    </IconButton>
                  </Tooltip>
                  
                </>
                )}
            </ul>
          </Toolbar>
        </AppBar>
      </Box>
    </Container>
    </>
  );
}

export default Header