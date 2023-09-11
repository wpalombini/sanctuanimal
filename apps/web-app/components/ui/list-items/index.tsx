import { Box, Typography, TypographyProps } from '@sanctuanimal/ui';

export const ItemLabel = ({ children }: { children: React.ReactNode }) => (
  <Typography variant="subtitle1">{children}</Typography>
);

export const ItemValue = (props: TypographyProps) => (
  <Typography {...props} noWrap fontWeight="500" />
);

export const ItemField = ({ children }: { children: React.ReactNode }) => (
  <Box
    sx={{
      paddingX: 1,
      width: { xs: '100%', sm: '110px', md: '170px', xl: '200px' },
    }}
  >
    {children}
  </Box>
);

export const ItemFieldGroup = ({ children }: { children: React.ReactNode }) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: { xs: 'column', sm: 'row' },
      justifyContent: 'space-around',
      gap: 1,
    }}
  >
    {children}
  </Box>
);
