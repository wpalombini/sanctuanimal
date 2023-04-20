import { Typography as TypographyMUI, TypographyProps } from '@mui/material';

export type { TypographyProps };

export const Typography = (props: TypographyProps) => {
  return <TypographyMUI {...props}>{props.children}</TypographyMUI>;
};
