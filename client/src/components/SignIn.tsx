import axios from "axios";
import { Button, InputAdornment, TextField, IconButton, Container } from "@mui/material";
import { Avatar, Card, CardHeader, Typography } from "@mui/material";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box } from "@mui/system";
import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";



const SignIn = () => {

    // Sign in fields state
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [togglePassword, setHandleTogglePassword] = useState(false)

    // Sign in user state
    const { dispatch } = useContext(AuthContext)
    const [isLoading, setIsLoading] = useState<any | null>(null)
    const [error, setError] = useState<any | null>(null)

    const handleTogglePassword = () => setHandleTogglePassword((show) => !show);

    const textFieldProps = {
        required: true,
        fullWidth: true,
        autoComplete: "off",
        sx: {mb: 2}
      };

      useEffect(() => {
        return () => {
        };
      }, []);  

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await signin(email, password)
    }

    const signin = async (email: string, password: string) => {
        setIsLoading(true)
        setError(null)

        const userData = { email, password }

            try {
                const response = await axios.post('https://keep-english-api.onrender.com/api/user/signin', userData);

                if (response.data) {
                    localStorage.setItem('user', JSON.stringify(response.data))
                    dispatch({type: 'SIGNIN', payload: response.data})
                    setIsLoading(false)

                } else {
                    setError('Sign in failed')
                    setIsLoading(false)
            }} 
            
            catch (error: any) {
                if (error.response && error.response.data && error.response.data.mssg) {
                    setError(`Could not sign in: ${error.response.data.mssg}`)
                    setIsLoading(false)
                  } else {
                    setError(`Sign in failed ${error.response.data.mssg}`)
                    setIsLoading(false)
                  }
        } 
    };

    return (
      <Container sx={{ minHeight: '100vh' }}>
        <Card
          elevation={2} 
          sx={{ maxWidth: 450, minHeight: 550, margin: '5rem auto', border: 1, borderColor: '#f61d44', borderRadius: 4, display: 'flex',
          flexDirection: 'column', boxShadow: '0 2px 4px #FCB1BE'
          }}>
          <CardHeader
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '2rem auto 2rem' }}
                    avatar={
                        <Avatar sx={{width: 56, height: 56, bgcolor: '#f61d44', color: '#fff', fontSize: 30, left: '0.6rem',  }}>S</Avatar>
                    }
                    title={
                    <Typography sx={{fontSize: 26, fontWeight:'medium' }}>
                      ign into your account
                    </Typography>}
          >
          </CardHeader>        
            <form onSubmit={onSubmit}>
                <Box 
                  sx={{
                  maxWidth: '350px',
                  margin: 'auto',
                  }}>
                    <TextField
                      {...textFieldProps}
                      id="email"
                      label="Email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}             
                    />
                    <TextField
                      {...textFieldProps}
                      name="password"
                      label="Password"
                      type={togglePassword ? 'text' : 'password'}
                      id="password"
                      InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton onClick={handleTogglePassword} >
                                {togglePassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          )
                        }}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                      sx={{ marginTop: '15px', color: '#fff', bgcolor: email && password ? '#066693' : '#69a3be', '&:hover': {
                        backgroundColor: '#066693'
                    }}}
                      type="submit"
                      variant="contained"
                      disabled={isLoading}
                    >
                    Sign In
                    </Button>
                    {error && <h4 className="error-message">{error}</h4>}
                </Box>
            <Typography 
              sx={{ marginTop: '2rem' }}>Not registered? Sign up 
              <Link to='/register' style={{ textDecoration: 'none', color: '#f61d44' }}> here</Link>
            </Typography>
            </form>
        </Card>
      </Container> 
     );
}
 
export default SignIn;

