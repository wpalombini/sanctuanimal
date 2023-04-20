'use client';

import { Toolbar as ToolbarUI, ToolbarProps } from 'ui';

export const Toolbar = (props: ToolbarProps) => {
  return <ToolbarUI {...props}>{props.children}</ToolbarUI>;
};
