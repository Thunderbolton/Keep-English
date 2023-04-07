import { Button, Grid, TextField } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')

    const onSubmit = async (e: any) => {
        e.preventDefault()
        console.log('User successfully registered.')
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
                    <TextField
                        required
                        fullWidth
                        autoComplete="off"
                        name="confirm-password"
                        label="Confirm Password"
                        id="confirm-password"
                        value={confirm}
                        onChange={(e) => setConfirm(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                    <Button variant="contained" type="submit" sx={{marginTop: '15px'}}>Register</Button>
                    </Grid>
                </Grid>
            </form>
        </>
     );
}
 
export default Register;