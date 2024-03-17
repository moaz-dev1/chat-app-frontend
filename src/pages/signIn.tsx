import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../environment";
import { useState } from "react";
import { Button, Container, Grid, TextField, Typography } from "@mui/material";

function SignIn() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleSignIn(e: any) {
        e.preventDefault();
        if (!email || !password) {
            alert("Please fill in all required fields.");
            return;
        }
        try {
            const result = await axios.post(API + '/auth/login', {
                email: email,
                password: password
            });
            
            if(!result.data.token) {
                alert('User not found!');
                return;
            } 
            
            localStorage.setItem('user', result.data.token);
            navigate('/');
            window.location.reload();
        } catch (error) {
            throw error;
        }
    }

    return (
        <div className='SignIn'>
            <Grid container  width={'70%'} style={{ margin: '50px auto' }} direction="column" alignItems="center" spacing={2}>
                <Typography variant="h2" style={{ color: '#0069D9'}}>Sign-In</Typography>
                <Grid item width={'70%'}>
                    <TextField
                        label="Email"
                        type="email"
                        variant="outlined"
                        fullWidth
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                    />
                </Grid>
                <Grid item width={'70%'}>
                    <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                    />
                </Grid>
                <Grid item>
                    <Button fullWidth variant="contained" color="primary" onClick={handleSignIn}>
                        Sign In
                    </Button>
                </Grid>
                <Grid item>
                    <span><Link to={'/signup'} style={{ textDecoration: 'none', color: '#0069D9' }}>Create an account?</Link></span>
                </Grid>
            </Grid>
        </div>
    )
}

export default SignIn;


// <form>
//     <Form.Label>Email</Form.Label>
//     <Form.Control type="email" placeholder="Enter your email" onChange={(e) => {
//         setEmail(e.target.value);
//     }}></Form.Control>
//     <br />
//     <Form.Label>Password</Form.Label>
//     <Form.Control type="password" placeholder="Enter your password" onChange={(e) => {
//         setPassword(e.target.value);
//     }}></Form.Control>
//     <br />
//     <Button type="submit" onClick={handleSignIn}>Sign In</Button>
//     <br />
//     <span><Link to={'/signup'}>Create an account?</Link></span>
// </Form>