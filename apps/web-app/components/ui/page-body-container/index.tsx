import { Container } from '@sanctuanimal/ui';
import React from 'react';

export const PageBodyContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        '> *': { marginBottom: '20px', width: { xs: '100%', lg: '75%' } },
      }}
    >
      {children}
    </Container>
  );
};
