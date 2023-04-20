'use client';

import { AppBar as AppBarUI, AppBarProps } from 'ui';

export const AppBar = (props: AppBarProps) => {
  return <AppBarUI {...props}>{props.children}</AppBarUI>;
};
