'use client';

import { Menu as MenuUI, MenuProps } from '@sanctuanimal/ui';

export const Menu = (props: MenuProps) => {
  return <MenuUI {...props}>{props.children}</MenuUI>;
};
