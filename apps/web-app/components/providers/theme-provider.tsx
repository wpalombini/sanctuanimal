'use client';

import { ThemeProvider as UIThemeProvider, ThemeProviderProps } from 'ui';

export type { ThemeProviderProps } from 'ui';

export const ThemeProvider = (props: ThemeProviderProps) => <UIThemeProvider {...props} />;
