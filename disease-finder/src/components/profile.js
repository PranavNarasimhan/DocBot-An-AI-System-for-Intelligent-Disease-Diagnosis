import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import Avatar from '@mui/material/Avatar';

export default function FloatingActionButtonSize() {
  return (
    <Box sx={{ '& > :not(style)': { m: 0 } }}>
      <Fab size="small" color="secondary" aria-label="add">
        <Avatar style={{position:"relative"}} alt="user" src="elements/prof_pic.jpg"/>
      </Fab>
    </Box>
  );
}
