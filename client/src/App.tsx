import { CssBaseline } from '@mui/material';
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Register from './components/Register';
import SignIn from './components/SignIn';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AuthContext } from "./context/AuthContext";
import { useContext, useMemo } from 'react';


const App = () => {

const { user } = useContext(AuthContext)

const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    //   // primary: { main: '#066693', light: '#69a3be', dark: '#044766' }, 
    //   // secondary: { main: '#f61d44', light: '#FCB1BE' },
    //   // info: { main: '#933306', light: '#be8469' }

  const theme = useMemo(
    () =>
      createTheme({
        typography: {
          fontFamily: [
            'Sintony',
          ].join(',')},

        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',

          primary: { 
            main: prefersDarkMode ? '#A3D3F9' : '#066693'
          },
          secondary: { 
            main: prefersDarkMode ? '#f61d44' : '#FCB1BE'
          },  
          info: {
            main: prefersDarkMode ? '#FF9761' : '#933306'
          },
          success: {
            main: prefersDarkMode ? '#A3D3F9' : '#066693'
          }
        },
      }),
    [prefersDarkMode],
  );

  return (
    <ThemeProvider theme={theme}> 

      <div className="App">
        <BrowserRouter>
        <CssBaseline />
          <Header />
          <Routes>
            <Route
              path='/'
              element={user ? <Home /> : <Navigate to='/signin'/>}
            />
            <Route
              path='/register'
              element={!user ? <Register /> : <Navigate to='/'/>}
            />
            <Route
              path='/signin'
              element={!user ? <SignIn /> : <Navigate to='/'/>}
            />
          </Routes>
        </BrowserRouter> 
      </div>
    </ThemeProvider>
  );
}

export default App;
