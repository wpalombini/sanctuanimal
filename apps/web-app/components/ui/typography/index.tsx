'use client';

import { Typography as TypographyUI, TypographyProps } from '@sanctuanimal/ui';

export const Typography = (props: TypographyProps) => {
  return <TypographyUI {...props}>{props.children}</TypographyUI>;
};
