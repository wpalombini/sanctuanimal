import { AppBar, Box, Container, Toolbar, Typography } from '@sanctuanimal/ui';
import { useRouter } from 'next/router';

import { useNavBarStore } from '@/lib/stores';

import { AuthNav } from '../auth-nav';

export const NavBar = () => {
  const router = useRouter();
  const { setAnchorElUser } = useNavBarStore();

  const handleNavigateTo = (url: string) => {
    router.push(url?.toLowerCase());
    setAnchorElUser(null);
  };

  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1 }}>
            <Typography
              variant="h6"
              noWrap
              onClick={() => handleNavigateTo('/')}
              sx={{
                color: 'inherit',
                cursor: 'pointer',
                display: 'inline',
              }}
            >
              SanctuAnimal
            </Typography>
          </Box>

          <AuthNav />
        </Toolbar>
      </Container>
    </AppBar>
  );
};
