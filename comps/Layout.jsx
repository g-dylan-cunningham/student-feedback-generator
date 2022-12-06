import React, { FunctionComponent } from 'react';
import Link from 'next/link';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

const Layout = ({ children }) => {
  return (
    <div>
      <nav>
        <span><Link href='/'>Home</Link>     </span>
        <span><Link href='/MyPage'>MyPage</Link></span>
      </nav>
      <CssBaseline />
      <Container maxWidth="xl">
        <Box sx={{ bgcolor: 'white', height: '100%' }}>
        { children }
        </Box>
      </Container>
      
    </div>
  );
}
 
export default Layout;
