import { store } from '../app/store';
import { Provider } from 'react-redux';
import '../styles/globals.css';
import Layout from '../comps/Layout';
import {
  CssBaseline,
} from '@mui/material';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <CssBaseline />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}

export default MyApp
