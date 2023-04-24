'use client';

import { Link as LinkUI, LinkProps } from '@sanctuanimal/ui';

export const Link = (props: LinkProps) => {
  return <LinkUI {...props}>{props.children}</LinkUI>;
};
