import { store } from '../app/store';
import { Provider } from 'react-redux';
import '../styles/globals.css';
import Layout from '../comps/Layout';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}

export default MyApp
