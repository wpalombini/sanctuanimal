import { Container } from '@sanctuanimal/ui';

import { NavBar } from '../navbar';
import NavigationLoadingBar from '../navigation-loading-bar';
import Notifications from '../notifications';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {/* Notifications */}
      <Notifications />

      {/* Top menu bar */}
      <NavBar />

      {/* Loading navigation bar */}
      <NavigationLoadingBar />

      {/* Page content */}
      <Container maxWidth="xl" sx={{ display: 'flex', paddingTop: '20px' }}>
        {children}
      </Container>
    </>
  );
};
