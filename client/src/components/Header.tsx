import { SignOut } from './SignOut';
import { Link } from 'react-router-dom';
import { Avatar, Button, Container, IconButton, Tooltip } from '@mui/material';
import { useTheme } from '@mui/material/styles';
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
import useMediaQuery from '@mui/material/useMediaQuery';

const Header = () => {

  const theme = useTheme();
  const primaryColor = theme.palette.primary.main;
  // const primaryLightColor = theme.palette.primary.light;
  // const primaryDarkColor = theme.palette.primary.dark;

  // const infoColor = theme.palette.info.main;

  // Signing users out of the site
  const { signout } = SignOut() 

  const handleSignOut = () => {
    signout()
  }

  const { user } = useContext(AuthContext)

  const [welcome, setWelcome] = useState('')
  const [avatar, setAvatar] = useState(true)

  const isSmallestScreen = useMediaQuery('(max-width: 350px)');
  const isSmallScreen = useMediaQuery('(max-width: 660px)');
  const isMedScreen = useMediaQuery('(max-width: 900px)');

  const headerButtonStyle = {
    marginLeft: '0.7rem',
    fontSize: 'clamp(0.2rem, 0.8rem, 1.5rem)',
    bgcolor: primaryColor
  };


  useEffect(() => {

    if (user && !isSmallScreen && !isMedScreen) {
      setWelcome(`Welcome back, ${user.name}`);
      setAvatar(false);
    
      const welcomeTimer = setTimeout(() => {
        setWelcome('');
        setAvatar(true);
      }, 4000);
   
      return () => clearTimeout(welcomeTimer);

    } else if (isSmallScreen || isMedScreen) {
      setWelcome('');
      setAvatar(true);
    }
    
    else {
      setWelcome('');
      setAvatar(true);
    }
  }, [user]);

  return (
    <>
    <Container maxWidth={false} disableGutters>
      <Box display="flex" justifyContent="center" alignItems="center">
        <AppBar color='transparent' position='static' sx={{ minHeight: '70px'}}>
          <Toolbar>
            {
              user && 
                (
                  <Link to="/">
                    <HomeIcon sx={{ color: '#f61d44', position: 'absolute', bottom: '30%' }} />
                  </Link>
                )
            }
            <Typography 
              sx={{ 
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
                fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)',
                // fontWeight: 'bold'
                }}>
              <Link to='/' 
                style={{ color: 'inherit', textDecoration: 'inherit' }}>Keep English
              </Link>
            </Typography>

            <ul style={{ marginLeft: 'auto', display: 'flex', flexWrap: 'nowrap' }}>
              
            {
              user && !isSmallScreen && (
                <>  
                  <span className='welcome-message' style={{ color: primaryColor }}>{welcome}</span>
                  {avatar ? (
                  <>
                    <Avatar sx={{ bgcolor: '#066693', color: '#fff', position: 'absolute', right: '120px', bottom: '15%' }}>
                      {user.name.charAt(0).toUpperCase()}
                    </Avatar>
                    <Button 
                      sx={{ headerButtonStyle, position: 'absolute', right: '15px', bottom: '18%' }}  
                      variant="outlined" 
                      color='info'
                      onClick={handleSignOut}>
                        SIGN OUT
                    </Button>
                  </>) : null}
                </>
            )}

            {
              !user && !isSmallScreen && (
                <>
                  <Button 
                    variant='outlined' 
                    color='primary'>
                    <Link to='/signin' 
                      style={{ textDecoration: 'none', color: primaryColor, fontSize: 'clamp(0.2rem, 0.8rem, 1.5rem)' }}>SIGN IN</Link>
                  </Button>
                  <Button 
                    sx={headerButtonStyle} 
                    variant='contained'>
                      <Link to='/register' 
                        style={{ textDecoration: 'none', color: '#fff' }}>REGISTER
                      </Link>
                  </Button>
                </>
            )}  
              
            {
              isSmallScreen && !user && (
                <>
                  <Tooltip title="Sign in">
                    <IconButton size="small" aria-label="login" component="label" >
                      <Link to='/signin'> 
                        <LoginIcon sx={{ color: '#f61d44' }}/>
                      </Link>  
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Register">
                    <IconButton size="small" aria-label="register-user" component="label">
                      <Link to='/register'>
                      <PersonAddAlt1Icon sx={{ color: '#70B3E4' }} />
                      </Link> 
                    </IconButton>
                  </Tooltip>
                </>
            )}

            {
              user && isSmallScreen && (
                <>
                  <Tooltip title="Sign out">
                    <IconButton color='info' onClick={handleSignOut}>
                      <LogoutIcon />
                    </IconButton>
                  </Tooltip>

                  {
                    !isSmallestScreen && (
                    <Avatar sx={{ bgcolor: '#066693', color: '#fff' }}>
                      {user.name.charAt(0).toUpperCase()}
                    </Avatar>
                  )}
                </>
              )
            }

            </ul>
          </Toolbar>
        </AppBar>
      </Box>
    </Container>
    </>
  );
}

export default Header