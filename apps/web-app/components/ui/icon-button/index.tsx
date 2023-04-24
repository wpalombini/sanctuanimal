'use client';

import { IconButton as IconButtonUI, IconButtonProps } from '@sanctuanimal/ui';

export const IconButton = (props: IconButtonProps) => {
  return <IconButtonUI {...props}>{props.children}</IconButtonUI>;
};
