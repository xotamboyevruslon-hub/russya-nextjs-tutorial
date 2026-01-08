import 'src/styles/globals.css';
import 'nprogress/nprogress.css';
import NProgress from 'nprogress';
import type { AppProps } from 'next/app';
import { CacheProvider, EmotionCache } from '@emotion/react';
import createEmotionCache from 'src/helpers/create-emotion-cache';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import theme from 'src/helpers/theme';
import { CssBaseline } from '@mui/material';
import { useEffect } from 'react';

const clientSideEmotionCache = createEmotionCache();


export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps, router } = props;

  useEffect(() => {
    const handleStart = () => NProgress.start();
    const handleStop = () => NProgress.done();

    // Router hodisalarini bog'lash
    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleStop);
    router.events.on('routeChangeError', handleStop);

    // Komponent o'chirilganda (unmount) hodisalarni tozalash
    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleStop);
      router.events.off('routeChangeError', handleStop);
    };
  }, []);


  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        < Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  );
}

export default MyApp
