'use client';

import { loginWithGoogle, logout } from 'lib/firebase';
import Link from 'next/link';

import { useAuthContext } from '@/components/providers';

import { AppBar } from '../appbar';
import { Container } from '../container';
import { Link as LinkUI } from '../link';
import { Toolbar } from '../toolbar';
import { Typography } from '../typography';

export const NavBar = () => {
  const { loading, user } = useAuthContext();

  const handleLogin = () => {
    if (loading) return;

    loginWithGoogle().catch(err => {
      console.error(err);
    });
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            <LinkUI color={'inherit'} component={Link} href="/">
              SanctuAnimal
            </LinkUI>
          </Typography>
          {!!user && user?.displayName}
          <button onClick={handleLogin}>Login</button>
          <button onClick={handleLogout}>Logout</button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
