import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { API } from '../environment';
import { useNavigate } from 'react-router-dom';


function Navbar() {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    async function logout() {
        try {
            await axios.get(API + '/auth/logout');
            localStorage.removeItem('user');
            navigate('/signin');
            window.location.reload();
        } catch (error) {
            throw error;
        }
    }

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    onClick={handleClick}
                    sx={{ mr: 2 }}
                >
                    <MenuIcon />
                </IconButton>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={handleClose}><Link to="/">Home</Link></MenuItem>
                    <MenuItem onClick={handleClose}>Dropdown</MenuItem>
                </Menu>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    <Link to={'/'} style={{textDecoration: 'none', color: 'white'}}>Chat App</Link>
                </Typography>
                <Button color="inherit" onClick={logout}>Log out</Button>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
