import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Container } from '@mui/system';

export default function Layout(props) {
  return (
    <div>
      <AppBar position="static"  elevation={0}>
        <Toolbar style={{backgroundColor: "white", color: 'black'}}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Tian's Travel Map
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <main>{props.children}</main>
        
    </div>
  );
}