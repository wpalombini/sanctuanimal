import { ThemeProvider } from '@sanctuanimal/ui';
import { AppProps } from 'next/app';
import Head from 'next/head';

import { AuthProvider } from '@/components/providers';
import { Layout } from '@/components/ui';
import { trpc } from '@/lib/http/client/trpc';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>SanctuAnimal</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider>
        <AuthProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AuthProvider>
      </ThemeProvider>
    </>
  );
};

export default trpc.withTRPC(App);
