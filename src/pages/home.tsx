import { Container, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Home() {
    console.log(localStorage.getItem('user'));
    return <>
        <Container >
            <Row className='justify-content-md-center' style={{marginTop: '50px'}}>Chat App</Row>
            <Row className='justify-content-md-center'>
                <Col lg={6} style={{marginTop: '50px'}}>
                    <Link to={'/signin'}><Button style={{width: '100%'}}>Sign in</Button></Link>
                </Col>
                <Col style={{marginTop: '50px'}}>
                    <Link to={'/signup'}><Button style={{width: '100%'}}>Sign up</Button></Link>
                </Col>
            </Row>
        </Container>
    
    </>
}

export default Home;