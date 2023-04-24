import { CssBaseline, Theme, ThemeProvider as DefaultThemeProvider } from '@mui/material';

import { theme as defaultTheme } from '..';

export type ThemeProviderProps = {
  children: React.ReactNode;
  theme?: Theme;
  useCssBaseLine?: boolean;
};

export const ThemeProvider = ({
  children,
  theme = defaultTheme,
  useCssBaseLine = true,
}: ThemeProviderProps) => {
  return (
    <DefaultThemeProvider theme={theme}>
      {useCssBaseLine && <CssBaseline />}
      {children}
    </DefaultThemeProvider>
  );
};
