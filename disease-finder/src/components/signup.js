import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Divider } from '@mui/material';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import './login.css'

const Signup2 = () => {
  const navigate = useNavigate();
  const handlelogin = () =>{
      navigate('/')
  };
  return (
    <Box
      component="form"
      sx={{ '& > :not(style)': { m: 1, width: '43ch'} }}
      noValidate
      autoComplete="off"
      style={{borderRadius:50}}
    >
        <img src="./elements/logo5.png" alt='logo' style={{width:70, height:70}}></img><br></br><br></br>
        <h2>Sign Up</h2>
        <h5>Create your account</h5>
        <Divider></Divider><br></br><br></br>
        <TextField id="outlined-basic" label="Username" variant="outlined" /><br></br>
        <TextField id="outlined-basic" label="Email Id" variant="outlined" /><br></br>
        <TextField id="outlined-basic" label="Password" variant="outlined" /><br></br>
        <TextField id="outlined-basic" label="Confirm Password" variant="outlined" /><br></br><br></br><br></br>
        <Button variant="contained" style={{borderRadius:50, backgroundColor:'rgb(155,1,73)'}} onClick={handlelogin}>Sign Up</Button>
    </Box>
  );
}

const Signup = () =>{
  return(
    <div className='loginpage'>
      <div className='overlay2'>
        <Signup2 />
      </div>
    </div>
  )
}
export default Signup