'use client';

import { Container as ContainerUI, ContainerProps } from 'ui';

export const Container = (props: ContainerProps) => {
  return <ContainerUI {...props}>{props.children}</ContainerUI>;
};