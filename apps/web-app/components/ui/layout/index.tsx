import { Container } from '@sanctuanimal/ui';

import { NavBar } from '../navbar';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NavBar />
      <Container maxWidth="xl">{children}</Container>
    </>
  );
};
