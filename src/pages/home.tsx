import { Link } from 'react-router-dom';
import RoomList from '../components/roomsList';
import { Grid } from '@mui/material';
import Navbar from '../components/navbar';

function Home() {
    return <>
        <Grid container spacing={2}>
            <Navbar />
            <Grid className='justify-content-md-center' style={{marginTop: '50px'}}>Chat App</Grid>
            <Grid className='justify-content-md-center'>
                < RoomList />
            </Grid>
        </Grid>


    
    </>
}

export default Home;