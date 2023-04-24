import { IconButton as IconButtonMUI, IconButtonProps } from '@mui/material';

export type { IconButtonProps };

export const IconButton = (props: IconButtonProps) => {
  return <IconButtonMUI {...props}>{props.children}</IconButtonMUI>;
};
