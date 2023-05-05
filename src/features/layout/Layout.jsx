import React from 'react';
import Head from 'next/head';
import Navbar from '@features/navbar';

import {DSContainer, DSContent} from './LayoutStyle';

export default function Layout({Component, pageProps}) {
  return (
    <DSContainer>
      <Head>
        <title>Dorsa</title>
        <meta name="description" content="Dorsa app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DSContent>
        <Navbar />
        <Component {...pageProps} />
      </DSContent>
    </DSContainer>
  );
}
