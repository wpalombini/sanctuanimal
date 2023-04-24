'use client';

import { Button as ButtonUI, ButtonProps } from '@sanctuanimal/ui';

export const Button = (props: ButtonProps) => {
  return <ButtonUI {...props}>{props.children}</ButtonUI>;
};
