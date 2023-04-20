'use client';

import { AppBar } from '../appbar';
import { Container } from '../container';
import { Toolbar } from '../toolbar';
import { Typography } from '../typography';

export const NavBar = () => {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            SanctuAnimal
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
