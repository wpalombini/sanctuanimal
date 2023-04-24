'use client';

import { useRouter } from 'next/navigation';

import { useNavBarStore } from '@/lib/stores';

import { AppBar } from '../appbar';
import { AuthNav } from '../auth-nav';
import { Container } from '../container';
import { Toolbar } from '../toolbar';
import { Typography } from '../typography';

export const NavBar = () => {
  const router = useRouter();
  const { setAnchorElUser } = useNavBarStore();

  const handleNavigateTo = (url: string) => {
    router.push(url?.toLowerCase());
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            onClick={() => handleNavigateTo('/')}
            sx={{
              flexGrow: 1,
              color: 'inherit',
              cursor: 'pointer',
            }}
          >
            SanctuAnimal
          </Typography>
          <AuthNav />
        </Toolbar>
      </Container>
    </AppBar>
  );
};
