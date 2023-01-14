import React, { Fragment } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  Box,
  Container,
  Grid
} from '@mui/material';
import NavBar from './NavBar';



const Layout = ({ children }) => {
  const { pathname } = useRouter();

  return (
    <Grid container direction="column">
      <Grid item>
        <NavBar />
      </Grid>
      <Grid item>
        <main style={{ marginTop: '100px' }}>
          {
            pathname !== '/Pdf' ? (
              <Fragment>
                
                <Container maxWidth="xl">
                  <Box sx={{ bgcolor: 'white', height: '100%' }}>
                    { children }
                  </Box>
                </Container>
              </Fragment>
            ) : children

          }
        </main>
      </Grid>
    </Grid>
  );
}
 
export default Layout;
