import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { EntriesContextProvider } from './context/EntryContext'
import { AuthContextProvider } from './context/AuthContext';

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <EntriesContextProvider>
        <App />
      </EntriesContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
