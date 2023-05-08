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

type AuthContextType = {
  loading: boolean;
  loginWithGoogle: () => Promise<UserCredential>;
  logout: () => Promise<void>;
  user: User | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<Error | undefined>();
  const { invalidate } = trpc.useContext();
  const { data: sanctuariesData } = trpc.getSanctuariesForAccount.useQuery(undefined, {
    enabled: !!user,
    staleTime: Infinity,
  });

  const router = useRouter();

  const logout = () => {
    invalidate();
    return rawLogout();
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
