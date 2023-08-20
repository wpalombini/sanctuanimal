import {
  AppBar,
  Avatar,
  Box,
  Container,
  Link as LinkMUI,
  Toolbar,
  Typography,
} from '@sanctuanimal/ui';
import Link from 'next/link';

import { AuthMenu } from '../auth-menu';
import { AuthNav } from '../auth-nav';

export const NavBar = () => {
  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <LinkMUI color="inherit" href="/" component={Link}>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <Box sx={{ paddingRight: 2 }}>
                <Avatar
                  alt="SanctuAnimal logo"
                  src="/logo/sanctuanimal-logo-v1a.jpg"
                  sx={{ height: 50, width: 50 }}
                />
              </Box>
              <Box>
                <Typography variant="h6" noWrap>
                  SanctuAnimal
                </Typography>
              </Box>
            </Box>
          </LinkMUI>

          <AuthNav />
          <AuthMenu />
        </Toolbar>
      </Container>
    </AppBar>
  );
};
