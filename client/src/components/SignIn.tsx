import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";

const SignIn = () => {

    const onSubmit = (e: any) => {
        e.preventDefault()
        console.log('submitted. User signed in')
    }

    return ( 
        <>
            <h2 style={{marginTop: '100px'}}>Sign into your account</h2>
            <Box 
            sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            maxWidth: '300px',
            margin: '20px auto'
            }}>
                <TextField
                margin="normal"
                required
                fullWidth
                autoComplete="off"
                id="email"
                label="Email"
                name="email"             
                />
                <TextField
                margin="normal"
                required
                fullWidth
                autoComplete="off"
                name="password"
                label="Password"
                type="password"
                id="password"
                />
                <Button
                onSubmit={onSubmit}
                sx={{marginTop: '15px'}}
                type="submit"
                variant="contained"
                color="primary"
                >
                Sign In
                </Button>
            </Box>
            <p>Not registered? Sign up <Link to='/register'>here</Link></p>
        </>
     );
}
 
export default SignIn;

