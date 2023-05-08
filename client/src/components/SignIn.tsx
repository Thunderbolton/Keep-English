import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { Link } from "react-router-dom";

const SignIn = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const textFieldProps = {
        required: true,
        fullWidth: true,
        autoComplete: "off",
        sx: {mb: 2}
      };

    const onSubmit = async (e: any) => {
        e.preventDefault()
        console.log('submitted. User signed in')
    }

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
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                    sx={{marginTop: '15px'}}
                    type="submit"
                    variant="contained"
                    color="primary"
                    >
                    Sign In
                    </Button>
                </Box>
            <p>Not registered? Sign up <Link to='/register'>here</Link></p>
            </form>
        </>
     );
}
 
export default SignIn;

