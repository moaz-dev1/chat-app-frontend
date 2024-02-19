import axios from "axios";
import { Button, Container, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../environment";
import { useState } from "react";

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
            window.location.reload();
        } catch (error) {
            throw error;
        }
    }

    return <>
        <div className='SignIn'>
            <Container style={{margin: '50px auto', width: '50%'}}>
                <h1 style={{textAlign: 'center', color: '#0069D9'}}>Sign-In</h1>
                <br />
                <Form>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter your email" onChange={(e) => {
                        setEmail(e.target.value);
                    }}></Form.Control>
                    <br />
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter your password" onChange={(e) => {
                        setPassword(e.target.value);
                    }}></Form.Control>
                    <br />
                    <Button type="submit" onClick={handleSignIn}>Sign In</Button>
                    <br />
                    <span><Link to={'/signup'}>Create an account?</Link></span>
                </Form> 
            </Container>
        </div>
    </>
}

export default SignIn;

