import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import Button from '@mui/material/Button';
import KeyboardVoiceRoundedIcon from '@mui/icons-material/KeyboardVoiceRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import Paper from '@mui/material/Paper';

export function BasicTextFields() {
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m:0.2, width: '50ch', paddingBottom:1},
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="standard-basic" label="Type Your Symptoms" variant="standard" sx={{input: {color:'rgba(30, 58, 95, 1)'}}}/>
    </Box>
  );
}

export function SimplePaper() {
    return (
      <Box sx={{ display: 'flex', flexWrap: 'wrap','& > :not(style)': {m: -1.4, width: "auto", height: "auto"}}}>
        <Paper elevation={4} style={{backgroundColor:"white", borderRadius:50}} sx={{border:0, borderColor:'white'}}>
            <table>
                <tr>
                  <td><Button size="large" variant="text"><SearchRoundedIcon style={{fill:'rgba(30, 58, 95, 1)'}} /></Button></td>
                  <td><BasicTextFields/></td>
                  <td><Button size="large" variant="text"><KeyboardVoiceRoundedIcon style={{fill:'rgba(30, 58, 95, 1)'}} /></Button></td>
                </tr>
            </table>
        </Paper>
      </Box>
    );
  }

export default SimplePaper

