import { Button, Grid, InputAdornment, TextField, InputProps, IconButton } from "@mui/material";
import {Visibility, VisibilityOff} from '@mui/icons-material';
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
                    dispatch({type: 'LOGIN', payload: response.data})
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
            <h2 style={{marginTop: '100px'}}>Create a new account</h2>
            <p>Already Registered? Sign in <Link to='/signin'>here</Link></p>
            <form onSubmit={onSubmit}>
            <Box 
                sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                maxWidth: '350px',
                margin: '20px auto'
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
                    
                    <Button disabled={isLoading} variant="contained" type="submit" sx={{marginTop: '15px'}}>Register</Button>
                    {error && <h4>{error}</h4>}
                </Box>    
            </form>
        </>
     );
    }
 
export default Register;