import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { EntriesContextProvider } from './context/EntryContext'
import { AuthContextProvider } from './context/AuthContext';

const theme = createTheme({
  typography: {
    fontFamily: [
      'Sintony',
    ].join(',')},
    
    palette: {
      primary: { main: '#066693', light: '#69a3be', dark: '#044766' }, 
      secondary: { main: '#f61d44', light: '#FCB1BE' },
      info: { main: '#933306', light: '#be8469' }
    },
  });


ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <EntriesContextProvider>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </EntriesContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
