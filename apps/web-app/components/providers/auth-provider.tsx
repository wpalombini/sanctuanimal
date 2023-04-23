'use client';

import {
  auth,
  loginWithGoogle,
  logout,
  onAuthStateChanged,
  User,
  UserCredential,
} from 'lib/firebase';
import { createContext, useContext, useEffect, useState } from 'react';

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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        setUser(user);
      } else {
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
