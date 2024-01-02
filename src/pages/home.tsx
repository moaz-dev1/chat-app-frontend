import { Container, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Navbar from '../components/navbar';
import RoomList from '../components/roomsList';

function Home() {
    return <>
        <Navbar />
        <Container >
            <Row className='justify-content-md-center' style={{marginTop: '50px'}}>Chat App</Row>
            <Row className='justify-content-md-center'>
            < RoomList />
            </Row>
        </Container>


    
    </>
}

export default Home;