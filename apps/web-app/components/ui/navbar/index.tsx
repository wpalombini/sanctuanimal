import { AppBar, Container, Toolbar, Typography } from '@sanctuanimal/ui';
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
