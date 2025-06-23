import * as React from 'react'
import TemporaryDrawer from './sidebar'
import BasicGrid from './tips';
import BasicTextFields from './searchbar';
import FloatingActionButtons from './profile';
import './home.css'

const Home = () =>  {
  return (
    <div className="app">
      <div className='overlay'></div>
      <video autoPlay loop muted id='video' style={{position:"fixed", zIndex:"-1", width:"100%"}}>
        <source src={"./elements/video_bg.mp4"} type='video/mp4' />
      </video>
      <br></br>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <div style={{paddingTop:0}}><TemporaryDrawer /></div>
        <div style={{paddingRight:15}}><FloatingActionButtons /></div>
      </div>
      <div className='content1'>
        <h1>Meet your smart medical assistant, DocBot.</h1><br></br><br></br>
        <img src="./elements/logo6.png" alt='logo' style={{width:70, height:70, padding:'30px'}}></img>
        <br></br>
        <BasicGrid /><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
        <BasicTextFields />
        <h6 style={{fontFamily:"arial"}}>DocBot can make mistakes. Check important info.</h6>
      </div>
    </div>
  );
}

export default Home;