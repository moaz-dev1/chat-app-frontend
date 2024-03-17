import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User } from "../models/user";
import axios from "axios";
import { API } from "../environment";
import { Container, Typography, Grid, TextField, Button } from "@mui/material";

function SingUp() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    async function handleSignUp(e: any) {
        e.preventDefault();
        if (!firstName || !lastName || !email || !password) {
            alert("Please fill in all required fields.");
            return;
        }
        
        try {
            const newUser: User = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
                createdTime: new Date()
            }
            
            await axios.post(API + '/users', newUser);            
            navigate('/signin');
            window.location.reload();
        } catch (error) {
            throw error;
        }
    }

    return ( <div className='SignUp'>
        <Typography variant="h2" align="center" style={{ color: '#0069D9', margin: '5%'}}>Sign-Up</Typography>
        <Grid container style={{margin: 'auto', width: '50%'}}>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <TextField
                        label="First Name"
                        variant="outlined"
                        fullWidth
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="Enter your first name"
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="Last Name"
                        variant="outlined"
                        fullWidth
                        required
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Enter your last name"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        required
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Password"
                        variant="outlined"
                        fullWidth
                        required
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="primary" onClick={handleSignUp}>
                        Create account
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <span><Link to={'/signin'}>Already have an account?</Link></span>
                </Grid>
            </Grid> 
            </Grid>
    </div> );
}

export default SingUp;