import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { destroyCookie, setCookie } from 'nookies';
import { createContext, useContext, useEffect, useState } from 'react';

import {
  auth,
  loginWithGoogle,
  logout as rawLogout,
  onIdTokenChanged,
  User,
  UserCredential,
} from '@/lib/firebase/client';
import { trpc } from '@/lib/http/client/trpc';
import { useNotificationStore } from '@/lib/stores';
import { Notification, NotificationType } from '@/lib/types';

type AuthContextType = {
  loading: boolean;
  loginWithGoogle: () => Promise<UserCredential>;
  logout: () => Promise<void>;
  user: User | null;
};

const publicPaths = ['/'];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<Error | undefined>();

  const queryClient = useQueryClient();
  const { data: sanctuariesData } = trpc.getSanctuariesForAccount.useQuery(undefined, {
    enabled: !!user,
    staleTime: Infinity,
  });

  const { setNotification } = useNotificationStore();

  const router = useRouter();

  const logout = async () => {
    queryClient.removeQueries();

    router.replace('/');
    rawLogout();
  };

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, async user => {
      if (user) {
        const idToken = await user.getIdToken();
        // set a cookie for page level authorization
        setCookie(null, 'app-auth', idToken, { path: '/' });

        setUser(user);
      } else {
        destroyCookie(null, 'app-auth');
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // if undefined, the query has not run yet.
    if (!sanctuariesData || !user) return;

    // If no sanctuary exists, redirect to /account to create the sanctuary
    if (sanctuariesData.sanctuaries.length === 0) {
      router.replace('/account');
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sanctuariesData, user]);

  useEffect(() => {
    const onRouteChangeComplete = async () => {
      const idToken = await user?.getIdToken();
      if (!loading && !idToken && !publicPaths.includes(window.location.pathname.toLowerCase())) {
        // notify user about invalid session.
        setNotification({
          message: 'Your session expired, please login.',
          type: NotificationType.Warning,
        } as Notification);
        // execute proper logout process.
        logout();
      }
    };

    // this needs to be called here,
    // as route event does not track the first page (app) load.
    onRouteChangeComplete();

    router.events.on('routeChangeComplete', onRouteChangeComplete);
    return () => {
      router.events.off('routeChangeComplete', onRouteChangeComplete);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.events, user, loading]);

  return (
    <AuthContext.Provider value={{ loading, loginWithGoogle, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuthContext must be used inside AuthProvider.');
  }

  return context;
};
