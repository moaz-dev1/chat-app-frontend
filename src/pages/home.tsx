import { Link } from 'react-router-dom';
import RoomsList from '../components/roomsList';
import { Grid, Typography } from '@mui/material';
import Navbar from '../components/navbar';
import FriendsList from '../components/friendsList';

function Home() {
    return <>
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Typography marginTop={'2%'} color={'primary'} variant='h3' align='center'>Chats</Typography>
            </Grid>
            <Grid item xs={12}>
                < RoomsList />
            </Grid>
            <Grid item xs={12}>
                <Typography marginTop={'5%'} color={'primary'} variant='h3' align='center'>Friends List</Typography>
            </Grid>
            <Grid item xs={12}>
                <FriendsList />
            </Grid>
        </Grid>
    </>
}

export default Home;