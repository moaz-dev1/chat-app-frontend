import { Link } from 'react-router-dom';
import RoomList from '../components/roomsList';
import { Grid, Typography } from '@mui/material';
import Navbar from '../components/navbar';

function Home() {
    return <>
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Navbar />
            </Grid>
            <Grid item xs={12}>
                <Typography color={'primary'} variant='h3' align='center'>Friends List</Typography>
            </Grid>
            <Grid item xs={12}>
                < RoomList />
            </Grid>
        </Grid>


    
    </>
}

export default Home;