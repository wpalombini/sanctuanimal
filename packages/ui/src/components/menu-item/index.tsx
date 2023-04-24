import { MenuItem as MenuItemMUI, MenuItemProps } from '@mui/material';

export type { MenuItemProps };

export const MenuItem = (props: MenuItemProps) => {
  return <MenuItemMUI {...props}>{props.children}</MenuItemMUI>;
};
