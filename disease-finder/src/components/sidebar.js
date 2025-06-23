import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import SettingsIcon from '@mui/icons-material/Settings';
import DensityMediumRounded from '@mui/icons-material/DensityMediumRounded'

export function ImageAvatars() {
  return (
    <Stack direction="row" spacing={2}>
      <Avatar style={{position:"relative"}} alt="user" src="elements/prof_pic.jpg" sx={{ width: 50, height: 50 }} />
    </Stack>
  );
}

export function TemporaryDrawer() {
    const [open, setOpen] = React.useState(false);
  
    const toggleDrawer = (newOpen) => () => {
      setOpen(newOpen);
    };
  
    const DrawerList = (
      <Box sx={{ width: 300}} role="presentation" onClick={toggleDrawer(false)}>
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon style={{color:"#FFFFFF"}}>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider color="white" />
        <BasicCard />
      </Box>
    );
  
    return (
      <div>
        <Button size="large" onClick={toggleDrawer(true)} startIcon={<DensityMediumRounded style={{color:"white"}}/>}></Button>
        <Drawer open={open} onClose={toggleDrawer(false)} PaperProps={{ sx: { backgroundColor: "#1E3A5F", color: "white"}}}>
          {DrawerList}
        </Drawer>
      </div>
    );
  }
  
  export function BasicCard() {
    return (
      <Card elevation={4} sx={{ width: 275}} style={{background: 'url("elements/prof_bg.jpg")', backgroundSize: "cover", position:"absolute", bottom:"0", marginBottom:"20px", marginLeft:"11px"}}>
        <CardContent>
            <ImageAvatars />
            <Typography variant='h6' style={{color:"white"}}><b>Varun Arunprabhu</b></Typography>
        </CardContent>
        <CardActions>
          <Button size="small" variant='contained' startIcon={<SettingsIcon />}>options</Button>
        </CardActions>
      </Card>
    );
  }

export default TemporaryDrawer