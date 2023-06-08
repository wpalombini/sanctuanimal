import { LinearProgress } from '@sanctuanimal/ui';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export const NavigationLoadingBar = () => {
  const [isNavigating, setIsNavigating] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const onRouteChangeStart = () => {
      setIsNavigating(true);
    };

    const onRouteChangeComplete = () => {
      setIsNavigating(false);
    };

    router.events.on('routeChangeStart', onRouteChangeStart);
    router.events.on('routeChangeComplete', onRouteChangeComplete);

    return () => {
      router.events.off('routeChangeStart', onRouteChangeStart);
      router.events.off('routeChangeComplete', onRouteChangeComplete);
    };
  }, [router.events]);

  return (
    <div style={{ height: '4px', position: 'sticky' }}>
      {isNavigating && <LinearProgress color="secondary" />}
    </div>
  );
};
