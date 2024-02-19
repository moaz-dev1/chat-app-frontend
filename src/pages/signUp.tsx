import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { User } from "../models/user";
import axios from "axios";
import { API } from "../environment";

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
        } catch (error) {
            throw error;
        }
    }

    return ( <div className='SignUp'>
        <Container style={{margin: '50px auto', width: '50%'}}>
                <h1 style={{textAlign: 'center', color: '#0069D9', marginBottom: '10%'}}>Sign-Up</h1>
                
                <Form>
                    <Row>
                        <Col>
                            <Form.Label>First Name</Form.Label>
                            <Form.Control required type="text" placeholder="Enter your first name" onChange={(e) => {
                                setFirstName(e.target.value);
                            }}></Form.Control>
                        </Col>
                        <Col>
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control required type="text" placeholder="Enter your Last name" onChange={(e) => {
                                setLastName(e.target.value);
                            }}></Form.Control>
                        </Col>
                    </Row>
                    <br />
                    <Form.Label>Email</Form.Label>
                    <Form.Control required type="email" placeholder="Enter your email" onChange={(e) => {
                        setEmail(e.target.value);
                    }}></Form.Control>
                    <br />
                    <Form.Label>Password</Form.Label>
                    <Form.Control required type="password" placeholder="Enter your password" onChange={(e) => {
                        setPassword(e.target.value);
                    }}></Form.Control>
                    <br />
                    <Button type="submit" onClick={handleSignUp}>Create account</Button>
                    <br />
                    <span><Link to={'/signin'}>Already have an account?</Link></span>
                </Form> 
            </Container>
    </div> );
}

export default SingUp;