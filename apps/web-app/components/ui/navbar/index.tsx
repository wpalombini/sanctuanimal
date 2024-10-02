import {
  AppBar,
  Avatar,
  Box,
  Container,
  Link as LinkMUI,
  Toolbar,
  Typography,
} from '@sanctuanimal/ui';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { CldImage } from 'next-cloudinary';

import { useAuthContext } from '@/components/providers';
import { trpc } from '@/lib/http/client/trpc';

import { AuthMenu } from '../auth-menu';
import { SubNavBar } from './sub-navbar';

export const NavBar = () => {
  const { user } = useAuthContext();
  const { query } = useRouter();

  const sanctuaryId = query.slug ? (query.slug as string) : '';

  const { data: sanctuaryData } = trpc.getSanctuaryById.useQuery(
    { id: sanctuaryId },
    {
      enabled: !!user && !!sanctuaryId,
      staleTime: Infinity,
    },
  );

  return (
    <AppBar position="sticky" elevation={0}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            sx={{
              display: 'flex',
              flexGrow: 1,
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Box>
              <LinkMUI color="inherit" href="/" component={Link}>
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                  <Box sx={{ paddingRight: 2 }}>
                    <Avatar sx={{ height: 50, width: 50 }}>
                      <CldImage
                        alt="SanctuAnimal logo"
                        src="sanctuanimal/public/logo/sanctuanimal-logo"
                        fill
                        resize={{ width: 100 }}
                      />
                    </Avatar>
                  </Box>
                </Box>
              </LinkMUI>
            </Box>

            <Box>
              <Typography variant="h5" noWrap>
                {sanctuaryData ? sanctuaryData.name : 'SanctuAnimal'}
              </Typography>
            </Box>

            <Box>
              <AuthMenu />
            </Box>
          </Box>
        </Toolbar>
        {!!user && <SubNavBar />}
      </Container>
    </AppBar>
  );
};
