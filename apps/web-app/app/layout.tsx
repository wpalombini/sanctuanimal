import { AuthProvider, ThemeProvider } from '@/components/providers';
import { Container, NavBar } from '@/components/ui';

export const metadata = {
  title: 'SanctuAnimal',
  description: 'An app for neglected animals',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <AuthProvider>
        <ThemeProvider>
          <body>
            <NavBar />
            <Container maxWidth="xl">{children}</Container>
          </body>
        </ThemeProvider>
      </AuthProvider>
    </html>
  );
};

export default RootLayout;
