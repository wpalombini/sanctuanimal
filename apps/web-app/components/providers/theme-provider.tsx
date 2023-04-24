'use client';

import { ThemeProvider as UIThemeProvider, ThemeProviderProps } from '@sanctuanimal/ui';

export type { ThemeProviderProps } from '@sanctuanimal/ui';

export const ThemeProvider = (props: ThemeProviderProps) => <UIThemeProvider {...props} />;
