'use client';

import { Typography as TypographyUI, TypographyProps } from 'ui';

export const Typography = (props: TypographyProps) => {
  return <TypographyUI {...props}>{props.children}</TypographyUI>;
};
