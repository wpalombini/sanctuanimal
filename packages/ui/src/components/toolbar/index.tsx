import { Toolbar as ToolbarMUI, ToolbarProps } from '@mui/material';

export type { ToolbarProps };

export const Toolbar = (props: ToolbarProps) => {
  return <ToolbarMUI {...props}>{props.children}</ToolbarMUI>;
};
