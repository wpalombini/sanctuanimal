import {
  AccountCircle,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Spinner,
  Typography,
} from '@sanctuanimal/ui';
import isEmpty from 'lodash-es/isEmpty';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

import { useAuthContext } from '@/components/providers';
import { trpc } from '@/lib/http/client/trpc';
import { useNavBarStore } from '@/lib/stores';

export const AuthNav = () => {
  const router = useRouter();
  const { anchorElUser, setAnchorElUser } = useNavBarStore();
  const { loginWithGoogle, logout, loading, user } = useAuthContext();

  const { data: sanctuariesData } = trpc.getSanctuariesForAccount.useQuery(undefined, {
    enabled: !!user,
    staleTime: Infinity,
  });

  const isSanctuarySetup = useMemo(
    () => !isEmpty(sanctuariesData?.sanctuaries),
    [sanctuariesData?.sanctuaries],
  );

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
    <>
      {!user && (
        <Button onClick={handleLogin} color="inherit" variant="text">
          {loading ? <Spinner color="white" /> : 'Login'}
        </Button>
      )}
      {!!user && (
        <>
          <IconButton onClick={handleOpenUserMenu} color="inherit">
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
            {isSanctuarySetup && (
              <MenuItem key={1} onClick={() => handleNavigateTo('/residents/new')}>
                <Typography textAlign="center">New Resident</Typography>
              </MenuItem>
            )}
            {isSanctuarySetup && (
              <MenuItem key={2} onClick={() => handleNavigateTo('/residents')}>
                <Typography textAlign="center">Residents</Typography>
              </MenuItem>
            )}
            <MenuItem key={3} onClick={() => handleNavigateTo('/account')}>
              <Typography textAlign="center">Account</Typography>
            </MenuItem>
            <MenuItem key={4} onClick={handleLogout}>
              <Typography textAlign="center">Logout</Typography>
            </MenuItem>
          </Menu>
        </>
      )}
    </>
  );
};
