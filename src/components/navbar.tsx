import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import BNavbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Form } from 'react-router-dom';
import { API } from '../environment';

async function logout() {
    try {
        await axios.get(API + '/auth/logout');
        localStorage.removeItem('user');
        window.location.reload();   
    } catch (error) {
        throw error;
    }
}
    

function Navbar() {
    return ( 
        <>
        <BNavbar expand="lg" className="bg-body-tertiary">
            <Container>
                <BNavbar.Toggle aria-controls="basic-navbar-nav" />
                <BNavbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">
                            Another action
                        </NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">
                            Separated link
                        </NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link onClick={logout}>Log out</Nav.Link>
                </Nav>
                </BNavbar.Collapse>
            </Container>
        </BNavbar>
        </>
     );
}

export default Navbar;