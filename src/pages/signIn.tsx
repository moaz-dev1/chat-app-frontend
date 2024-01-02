import axios from "axios";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../environment";
import { useState } from "react";

function SignIn() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return <>
        <div className='SignIn'>
            <input placeholder='Email' onChange={(e) => {
                setEmail(e.target.value);
            }}></input>
            <input type='password' placeholder='Password' onChange={(e) => {
                setPassword(e.target.value);
            }}></input>

            <Button onClick={async () => {
                try {
                    const result = await axios.post(API + '/auth/login', {
                        email: email,
                        password: password
                    });

                    localStorage.setItem('user', result.data);
                    window.location.reload();
                } catch (error) {
                    throw error;
                }
            }}>Sign In</Button>
        </div>
    </>
}

export default SignIn;