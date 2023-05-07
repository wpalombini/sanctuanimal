import { ThemeProvider } from '@sanctuanimal/ui';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AppProps } from 'next/app';
import Head from 'next/head';

import { AuthProvider } from '@/components/providers';
import { Layout } from '@/components/ui';
import { trpc } from '@/lib/http/client/trpc';
import { isEnvProduction } from '@/lib/utils';

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
            {!isEnvProduction() && <ReactQueryDevtools initialIsOpen={false} />}
            <Component {...pageProps} />
          </Layout>
        </AuthProvider>
      </ThemeProvider>
    </>
  );
};

export default trpc.withTRPC(App);
