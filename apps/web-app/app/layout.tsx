import { Container } from '../components/ui/container';
import { ThemeProvider } from '../components/ui/theme-provider-client';

export const metadata = {
  title: 'SanctuAnimal',
  description: 'An app for neglected animals',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <ThemeProvider>
        <body>
          <Container maxWidth="xl">{children}</Container>
        </body>
      </ThemeProvider>
    </html>
  );
};

export default RootLayout;
