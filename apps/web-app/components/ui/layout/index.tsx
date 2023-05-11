import { Container, LinearProgress } from '@sanctuanimal/ui';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { NavBar } from '../navbar';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isNavigating, setIsNavigating] = useState(false);

  const router = useRouter();

  useEffect(() => {
    router.events.on('routeChangeStart', () => {
      setIsNavigating(true);
    });
    router.events.on('routeChangeComplete', () => {
      setIsNavigating(false);
    });
    return () => {
      router.events.off('routeChangeComplete', () => {
        console.log('stopped');
      });
    };
  }, [router.events]);

  return (
    <>
      <NavBar />
      <div style={{ height: '4px', position: 'sticky' }}>
        {isNavigating && <LinearProgress color="secondary" />}{' '}
      </div>
      <Container maxWidth="xl" sx={{ paddingTop: '20px' }}>
        {children}
      </Container>
    </>
  );
};
