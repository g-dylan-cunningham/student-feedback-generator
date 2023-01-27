import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Box,
  TextField,
  Grid,
  FormControl,
  Stack,
  Button,
  Typography,
} from '@mui/material';
import { CreateClass, DisplayCurrentClass } from '../comps/classes';
import {
  selectCurrentClass,
} from '../selectors';

export default function Home() {
  const currentClassId = useSelector(selectCurrentClass);
  return (
    <div>
      <Head>
        <title>Batch Report Generator</title>
        <meta name="description" content="Tool to help teachers generate student feedback" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>
          Welcome to <a href="https://nextjs.org">Batch Report Generator</a>
        </h1>

        {
          currentClassId ? <DisplayCurrentClass /> : <CreateClass />
        }




      </main>
    </div>
  )
}
