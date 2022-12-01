import React, { FunctionComponent } from 'react';
import Link from 'next/link';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';


// type LayoutProps = {
//   children: React.ReactNode,
// }

const Layout = ({ children }) => {
  return (
    <div>
      <nav>
        <div><Link href='/'>Home</Link></div>
        <div><Link href='/Test'>Test</Link></div>
        <div><Link href='/MyPage'>MyPage</Link></div>
        <div><Link href='/'>Home</Link></div>
      </nav>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }}>
        { children }
        </Box>
      </Container>
      
    </div>
  );
}
 
export default Layout;
