import { Button as ButtonMUI, ButtonProps } from '@mui/material';

export type { ButtonProps };

export const Button = (props: ButtonProps) => {
  return <ButtonMUI {...props}>{props.children}</ButtonMUI>;
};
