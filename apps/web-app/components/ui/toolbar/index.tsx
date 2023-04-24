'use client';

import { Toolbar as ToolbarUI, ToolbarProps } from '@sanctuanimal/ui';

export const Toolbar = (props: ToolbarProps) => {
  return <ToolbarUI {...props}>{props.children}</ToolbarUI>;
};
