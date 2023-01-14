import React, {
  useState,
} from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  Link,
  AppBar,
  Box,
  Toolbar,
  Typography,
  Divider,
  List,
  Drawer,
  ListItem,
  ListItemButton,
  ListItemText,
  Button,
  Menu,
  MenuItem,
  Container,
  Avatar,
  Tooltip,
  IconButton,
} from '@mui/material';
// import AdbIcon from '@mui/icons-material/Adb';
import MenuIcon from '@mui/icons-material/Menu';
import ActiveLink from './ActiveLink';


{/* <Link href='/'>Home</Link>     
<Link href='/MyPage'>MyPage</Link>     
<Link href='/Report'>Report</Link> */}
const pages = [
  { title: 'Home', href: '/' },
  { title: 'Students', href: '/MyPage' },
  { title: 'Report', href: '/Report' },
  { title: 'PDF', href: '/Pdf' },
];

const drawerWidth = 240;
const navItems = ['Home', 'About', 'Contact'];






function DrawerAppBar(props) {
  const [ mobileOpen, setMobileOpen ] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MUI
      </Typography>
      <Divider />
      {pages.map(({title, href}) => (
          <ActiveLink title={title} href={href} customStyle={{ color: 'black' }}/>
        ))}
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ fontSize: '1.5em', flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            REPORT GENERATOR
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {/* {navItems.map((item) => (
              <Button key={item} sx={{ color: '#fff' }}>
                {item}
              </Button>
            ))} */}
            <Grid container direction="row" justifyContent="right">
              {pages.map(({ title, href }) => (
                <Grid item key={title}>
                  <ActiveLink title={title} href={href} />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

// <List>
// <ListItem key={title} disablePadding>
//       <ListItemButton sx={{ textAlign: 'center' }}>
//         <ListItemText primary={item} />
//       </ListItemButton>
//     </ListItem>
// </List>

export default DrawerAppBar;
