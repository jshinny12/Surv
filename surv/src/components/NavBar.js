import React from 'react'
import {AppBar, Toolbar, IconButton, Stack, Button ,Typography} from '@mui/material'
import AlignHorizontalLeftIcon from '@mui/icons-material/AlignHorizontalLeft';
import {useNavigate} from "react-router-dom";



const NavBar = () => {
    const navigate = useNavigate();
    const butt = {
        marginLeft: 'auto'
    };
      
    return (
        <div>
            <AppBar position = 'static'>
                <Toolbar variant="dense">
                    <IconButton size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }} onClick = {(e) => navigate('/')}>
                        <AlignHorizontalLeftIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Surv
                    </Typography>
                    <Stack direction = 'row' spacing = {2} style = {butt}> 
                        <Button color = 'inherit' onClick = {(e) => navigate('/')}> Home </Button>
                        <Button color = 'inherit' onClick = {(e) => navigate('/about')}> About </Button>
                        <Button color = 'inherit' onClick = {(e) => navigate('/contact')}> Contact </Button>
                        <Button color = 'inherit' onClick = {(e) => navigate('/faq')}> Faq </Button>
                    </Stack>
                </Toolbar>
            </AppBar>

        </div>
    )
}

export default NavBar
