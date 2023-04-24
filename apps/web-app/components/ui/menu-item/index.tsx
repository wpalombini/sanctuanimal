'use client';

import { MenuItem as MenuItemUI, MenuItemProps } from '@sanctuanimal/ui';

export const MenuItem = (props: MenuItemProps) => {
  return <MenuItemUI {...props}>{props.children}</MenuItemUI>;
};
