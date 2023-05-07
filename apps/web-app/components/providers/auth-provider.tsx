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

        // go to the api, validate idToken and get user and sanctuary from db.
        // if user does not exist, create it out of idToken while on the api.
        // if sanctuary does not exist, redirect the user to create sanctuary page.

        setUser(user);
      } else {
        destroyCookie(null, 'app-auth');
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

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
