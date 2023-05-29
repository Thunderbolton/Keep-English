import { SignOut } from './SignOut';
import { Link } from 'react-router-dom';
import { Button, Container } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { AuthContext } from "../context/AuthContext";
import { useContext, useEffect, useState } from 'react';



const Header = () => {

  // Signing users out of the site
  const { signout } = SignOut() 

  const handleSignOut = () => {
    signout()
  }

  const { user } = useContext(AuthContext)

  const [welcome, setWelcome] = useState('')

  useEffect(() => {
    if (user)
    setWelcome(`Welcome back, ${user.name}`)
    const welcomeTimer = setTimeout(() => {
        setWelcome(`${user.name}`);
    }, 3000);

    return () => clearTimeout(welcomeTimer);
  }, [user]);

  return (
    <>
    <Container maxWidth={false} disableGutters>
      <Box>
        <AppBar color='transparent' position='static'>
          <Toolbar>
            <Link to="/">
              <HomeIcon sx={{color: 'green'}} />
            </Link>
            <Typography variant="h3" sx={{ paddingLeft: '12%', marginLeft: 'auto', fontSize: 'clamp(1rem, 1.7rem, 2rem)' }}><Link to='/' style={{ color: 'inherit', textDecoration: 'inherit'}}>Keep English</Link>
            </Typography>
            <ul style={{marginLeft: 'auto', display: 'flex', flexWrap: 'nowrap'}}>
            {user && (
            <>  
              <p>{welcome}</p>
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