import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {
  // Link,
  Button,
} from '@mui/material';

function ActiveLink({ title, href, customStyle }) {

  const router = useRouter();

  const baseStyle = {
    color: '#fff',
    fontSize: '1.3em',
    marginRight: 10,
    fontWeight: router.asPath === href ? '800' : '400',
  }

  const handleClick = (e) => {
    e.preventDefault()
    console.log(href)
    router.push(href)
  }

  return (
    <Link
      href={{
        pathname: href,
      }}
    >
      <Button
        // onClick={handleClick}
        sx={{
          color: '#fff',
          fontSize: '1.3em',
          marginRight: 10,
          fontWeight: router.asPath === href ? '800' : '400',
          ...customStyle,
        }}
      >
        {title}
      </Button>
    </Link>
  );
};

export default ActiveLink;