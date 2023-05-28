import axios from "axios";
import { Button, InputAdornment, TextField, IconButton } from "@mui/material";
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
                const response = await axios.post('/api/user/signin', userData);

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
                    setError('Sign in failed')
                    setIsLoading(false)
                  }
        } 
    };

    return ( 
        <>
            <h2 style={{marginTop: '100px'}}>Sign into your account</h2>
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
                    sx={{marginTop: '15px'}}
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={isLoading}
                    >
                    Sign In
                    </Button>
                    {error && <h4>{error}</h4>}
                </Box>
            <p>Not registered? Sign up <Link to='/register'>here</Link></p>
            </form>
        </>
     );
}
 
export default SignIn;

