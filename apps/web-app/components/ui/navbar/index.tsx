'use client';

import Link from 'next/link';

import { AppBar } from '../appbar';
import { Container } from '../container';
import { Link as LinkUI } from '../link';
import { Toolbar } from '../toolbar';
import { Typography } from '../typography';

export const NavBar = () => {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            <LinkUI color={'inherit'} component={Link} href="/">
              SanctuAnimal
            </LinkUI>
          </Typography>
          <LinkUI color={'inherit'} component={Link} href="/residents">
            Residents
          </LinkUI>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
