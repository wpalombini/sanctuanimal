import { Typography as TypographyMUI, TypographyProps, TypographyTypeMap } from '@mui/material';

export type { TypographyProps };
export type { TypographyTypeMap };

export const Typography = (props: TypographyProps) => {
  return <TypographyMUI {...props}>{props.children}</TypographyMUI>;
};
