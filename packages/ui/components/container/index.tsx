import { Container as ContainerMUI, ContainerProps } from '@mui/material';

export type { ContainerProps };

export const Container = (props: ContainerProps) => {
  return <ContainerMUI {...props}>{props.children}</ContainerMUI>;
};
