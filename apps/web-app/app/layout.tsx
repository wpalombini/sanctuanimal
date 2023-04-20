import { Container, NavBar, ThemeProvider } from '@/components/ui';

export const metadata = {
  title: 'SanctuAnimal',
  description: 'An app for neglected animals',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <ThemeProvider>
        <body>
          <NavBar />
          <Container maxWidth="xl">{children}</Container>
        </body>
      </ThemeProvider>
    </html>
  );
};

export default RootLayout;
