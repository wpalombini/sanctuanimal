import { AppBar as AppBarMUI, AppBarProps } from '@mui/material';

export type { AppBarProps };

export const AppBar = (props: AppBarProps) => {
  return <AppBarMUI {...props}>{props.children}</AppBarMUI>;
};
