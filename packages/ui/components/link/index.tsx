import { Link as LinkMUI, LinkProps as LinkPropsMUI } from '@mui/material';

type LinkProps = LinkPropsMUI & { component: unknown };
export type { LinkProps };

export const Link = (props: LinkProps) => {
  return <LinkMUI {...props}>{props.children}</LinkMUI>;
};
