import { Box, Link as LinkMUI } from '@sanctuanimal/ui';
import Link from 'next/link';

import { useAuthContext } from '@/components/providers';

export const AuthNav = () => {
  const { user } = useAuthContext();

  return (
    <Box sx={{ flexGrow: 1, '& > a': { paddingLeft: 2, display: { xs: 'none', sm: 'inline' } } }}>
      {!!user && (
        <>
          <LinkMUI color="inherit" href="/sanctuaries" component={Link}>
            Sanctuaries
          </LinkMUI>
        </>
      )}
    </Box>
  );
};
