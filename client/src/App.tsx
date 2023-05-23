import { CssBaseline } from '@mui/material';
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Register from './components/Register';
import SignIn from './components/SignIn';
import { AuthContext } from "./context/AuthContext";
import { useContext } from 'react';


const App = () => {

const { user } = useContext(AuthContext)

  return (
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
  );
}

export default App;
