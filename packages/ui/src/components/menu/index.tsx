import { Menu as MenuMUI, MenuProps } from '@mui/material';

export type { MenuProps };

export const Menu = (props: MenuProps) => {
  return <MenuMUI {...props}>{props.children}</MenuMUI>;
};
