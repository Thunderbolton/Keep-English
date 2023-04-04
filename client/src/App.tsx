import { CssBaseline } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Register from './components/Register';
import SignIn from './components/SignIn';

// interface Entry {
//   // comments: string
//   createdAt: number
//   title: string
//   text: string
//   updatedAt: number
//   _id: number
// }

const App = () => {

  return (
    <div className="App">
      <BrowserRouter>
      <CssBaseline />
        <Header />
        <Routes>
          <Route
            path='/'
            element={<Home />}
          />
          <Route
            path='/register'
            element={<Register />}
          />
          <Route
            path='/signin'
            element={<SignIn />}
          />
        </Routes>
      </BrowserRouter> 
    </div>
  );
}

export default App;
