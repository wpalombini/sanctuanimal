'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { useAuthContext } from '@/components/providers';

import { AppBar } from '../appbar';
import { Button } from '../button';
import { Container } from '../container';
import { IconButton } from '../icon-button';
import { AccountCircle } from '../icons';
import { Menu } from '../menu';
import { MenuItem } from '../menu-item';
import { Toolbar } from '../toolbar';
import { Typography } from '../typography';

export const NavBar = () => {
  const router = useRouter();
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const { loginWithGoogle, logout, loading, user } = useAuthContext();

  const handleLogin = () => {
    if (loading) return;

    loginWithGoogle().catch(err => {
      console.error(err);
    });
  };

  const handleLogout = () => {
    logout();
    handleCloseUserMenu();
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleNavigateTo = (url: string) => {
    router.push(url?.toLowerCase());
    handleCloseUserMenu();
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
          {!user && (
            <Button onClick={handleLogin} color="inherit">
              {loading ? 'Loading...' : 'Login'}
            </Button>
          )}
          {!!user && (
            <>
              <IconButton onClick={handleOpenUserMenu} sx={{ color: 'inherit', padding: 0 }}>
                <AccountCircle />
              </IconButton>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem key={1} onClick={() => handleNavigateTo('residents')}>
                  <Typography textAlign="center">Residents</Typography>
                </MenuItem>
                <MenuItem key={2} onClick={handleLogout}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              </Menu>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
