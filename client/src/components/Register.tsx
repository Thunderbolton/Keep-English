import { Button, InputAdornment, TextField, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Avatar, Card, CardHeader, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";


const Register = () => {

    // Register fields state
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [togglePassword, setHandleTogglePassword] = useState(false)


    // Register user state
    const { dispatch } = useContext(AuthContext)
    const [isLoading, setIsLoading] = useState<any | null>(null)
    const [error, setError] = useState<any | null>(null)
    
    
    // Show/hide password 
    const handleTogglePassword = () => setHandleTogglePassword((show) => !show);

    const textFieldProps = {
        required: true,
        fullWidth: true,
        autoComplete: "off",
        sx: {mb: 2}
      };

    // Form submission
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await register(name, email, password)
    };


    const register = async (name: string, email: string, password: string) => {
        setIsLoading(true)
        setError(null)

        const userData = { name, email, password }

            try {
                const response = await axios.post('/api/user/register', userData);

                if (response.data) {
                    console.log(response.data);
                    localStorage.setItem('user', JSON.stringify(response.data))
                    dispatch({type: 'SIGNIN', payload: response.data})
                    setIsLoading(false)

                } else {
                    setError('Registration failed')
                    setIsLoading(false)
            }} 
            
            catch (error: any) {
                if (error.response && error.response.data && error.response.data.mssg) {
                    setError(`Registration failed: ${error.response.data.mssg}`)
                    setIsLoading(false)
                  } else {
                    setError('Registration failed')
                    setIsLoading(false)
                  }
        } 
    };
        
    return ( 
        <>
         <Card 
            elevation={2} 
            sx={{ maxWidth: 450, minHeight: 550, margin: '5rem auto', border: 1, borderColor: '#BFC9CA', borderRadius: 4, display: 'flex',
            flexDirection: 'column', boxShadow: '0 2px 4px #3f50b5'
            }}>
            <CardHeader
                sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '2rem auto 2rem'}}
                    avatar={
                        <Avatar sx={{width: 56, height: 56, bgcolor: '#3f50b5', fontSize: 30, left: '0.6rem' }}>C</Avatar>
                    }
                    title={
                    <Typography sx={{fontSize: 26, fontWeight:'medium' }}>
                        reate a new account
                    </Typography>}
            >
            </CardHeader> 
            <form onSubmit={onSubmit}>
            <Box 
                sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                maxWidth: '350px',
                margin: 'auto'
                }}>
                    <TextField
                        {...textFieldProps}
                        name="name"
                        label="Name"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        />
                    <TextField
                        {...textFieldProps}
                        name="email"
                        label="Email"
                        id="email"
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
                        disabled={isLoading} 
                        variant="contained" 
                        color="success" 
                        type="submit" sx={{ marginTop: '15px' }}>Register
                    </Button>
                    {error && <h4 className="error-message">{error}</h4>}
                    <Typography 
                        sx={{ marginTop: '2rem' }}>Already registered? Sign in 
                        <Link to='/signin' style={{ textDecoration: 'none', color: '#3f50b5' }}> here</Link>
                    </Typography>
                </Box>    
            </form> 
            </Card>
        </>
     );
    }
 
export default Register;