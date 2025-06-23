import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function BasicGrid() {
  return (
    <Box sx={{flexGrow:0.4}}>
      <Grid container>
        <Grid item xs={6.5} style={{marginLeft:'auto', marginRight:'auto'}}>
          <table>
            <tr>
              <td style={{padding:'20px'}}><Item style={{color:'white', backgroundColor:"rgba(30, 58, 95,0.6)", borderRadius: 10, fontFamily:"verdana"}} sx={{border:3, borderColor:'rgba(30, 58, 95, 1)'}}>Use sunscreen and wear protective clothing when exposed to the sun.</Item></td>
              <td style={{padding:'20px'}}><Item style={{color:'white', backgroundColor:"rgba(245, 29, 22, 0.5)", borderRadius: 10, fontFamily:"verdana"}} sx={{border:3, borderColor:'rgba(186, 4, 4, 1)'}}>Practice relaxation techniques like deep breathing, meditation, or yoga.</Item></td>
              <td style={{padding:'20px'}}><Item style={{color:'white', backgroundColor:"rgba(30, 58, 95,0.6)", borderRadius: 10, fontFamily:"verdana"}} sx={{border:3, borderColor:'rgba(30, 58, 95, 1)'}}>Wash your hands regularly and maintain good oral hygiene.</Item></td>
              <td style={{padding:'20px'}}><Item style={{color:'white', backgroundColor:"rgba(245, 29, 22, 0.5)", borderRadius: 10, fontFamily:"verdana"}} sx={{border:3, borderColor:'rgba(186, 4, 4, 1)'}}>Include plenty of fruits, vegetables, lean proteins, and whole grains.</Item></td>
            </tr>
          </table>
        </Grid>
      </Grid>
    </Box>
  );
}
