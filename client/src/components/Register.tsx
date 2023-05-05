import { Button, Grid, TextField } from "@mui/material";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";


const Register = () => {

    // Register fields state
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // Register user state
    const [isLoading, setIsLoading] = useState<any | null>(null)
    const [error, setError] = useState<any | null>(null)
    const { dispatch } = useContext(AuthContext)
    

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await register(name, email, password)
    }


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
    }
        
        
    return ( 
        <>
            <h2 style={{marginTop: '100px'}}>Create a new account</h2>
            <p>Already Registered? Sign in <Link to='/signin'>here</Link></p>
            <form onSubmit={onSubmit}>
                <Grid container spacing={1} sx={{ maxWidth: '400px', margin: 'auto'}}>
                    <Grid item xs={6}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        autoComplete="off"
                        name="name"
                        label="Name"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={6}>
                    <TextField
                        margin="normal"
                        fullWidth
                        required
                        autoComplete="off"
                        name="email"
                        label="Email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={6}>
                    <TextField
                        required
                        fullWidth
                        autoComplete="off"
                        name="password"
                        label="Password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={6}>
                    {/* <TextField
                        required
                        fullWidth
                        autoComplete="off"
                        name="confirm-password"
                        label="Confirm Password"
                        id="confirm-password"
                        value={confirm}
                        onChange={(e) => setConfirm(e.target.value)}
                        /> */}
                    </Grid>
                    <Grid item xs={12}>
                    <Button disabled={isLoading} variant="contained" type="submit" sx={{marginTop: '15px'}}>Register</Button>
                    {error && <h4>{error}</h4>}
                    </Grid>
                </Grid>
            </form>
        </>
     );
    }
 
export default Register;