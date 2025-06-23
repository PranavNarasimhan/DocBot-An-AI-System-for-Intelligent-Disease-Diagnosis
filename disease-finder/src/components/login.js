import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Divider } from '@mui/material';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import './login.css'

const Login1 = () => {
    const navigate = useNavigate();
    const handlelogin = () =>{
        navigate('/home')
    };
    const handlelogin2 = () =>{
      navigate('/signup')
  };
  return (
    <Box
      component="form"
      sx={{ '& > :not(style)': { m: 1, width: '43ch'} }}
      noValidate
      autoComplete="off"
    >
        <img src="./elements/logo5.png" alt='logo' style={{width:70, height:70}}></img><br></br><br></br>
        <h2>Welcome back !</h2>
        <h5>Log in to get unlimited access to data and information</h5><br></br><br></br>
        <h5>Email</h5>
        <TextField id="outlined-basic" label="Enter your mail address" variant="outlined" /><br></br>
        <h5>Password</h5>
        <TextField id="outlined-basic" label="Enter password" variant="outlined" /><br></br><br></br>
        <Button id="check1" variant="contained" style={{borderRadius:50, backgroundColor:'rgb(155,1,73)'}} onClick={handlelogin}>Sign In</Button><br></br><br></br>
        <Divider color="white">or</Divider><br></br>
        <h4 style={{textAlign:'center'}}>Don't have an account ? <Button variant='contained' size='small' onClick={handlelogin2} style={{backgroundColor:'rgb(155,1,73)'}}>Sign Up</Button></h4>
    </Box>
  );
}

const Login = () =>{
  return(
    <div className='loginpage'>
      <div className='overlay2'>
      <Login1 />
      </div>
    </div>
  )
}
export default Login