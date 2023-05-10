import {
  AccountCircle,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Spinner,
  Typography,
} from '@sanctuanimal/ui';
import { useRouter } from 'next/router';

import { useAuthContext } from '@/components/providers';
import { useNavBarStore } from '@/lib/stores';

export const AuthNav = () => {
  const router = useRouter();
  const { anchorElUser, setAnchorElUser } = useNavBarStore();
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
            <MenuItem key={1} onClick={() => handleNavigateTo('residents')}>
              <Typography textAlign="center">Residents</Typography>
            </MenuItem>
            <MenuItem key={2} onClick={() => handleNavigateTo('account')}>
              <Typography textAlign="center">Account</Typography>
            </MenuItem>
            <MenuItem key={3} onClick={handleLogout}>
              <Typography textAlign="center">Logout</Typography>
            </MenuItem>
          </Menu>
        </>
      )}
    </>
  );
};
