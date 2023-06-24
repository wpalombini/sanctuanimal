import { AppBar, Box, Container, Link as LinkMUI, Toolbar, Typography } from '@sanctuanimal/ui';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useNavBarStore } from '@/lib/stores';

import { AuthMenu } from '../auth-menu';

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
            <LinkMUI color="inherit" href="/residents" component={Link}>
              Residents
            </LinkMUI>
            <LinkMUI color="inherit" href="/account" component={Link}>
              Account
            </LinkMUI>
          </Box>

          <AuthMenu />
        </Toolbar>
      </Container>
    </AppBar>
  );
};
