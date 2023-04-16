import { ThemeProvider } from '../components/theme-provider-client';

export const metadata = {
  title: 'SanctuAnimal',
  description: 'An app for neglected animals',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
