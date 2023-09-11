import { Box, Button, Link as LinkMUI } from '@sanctuanimal/ui';
import Link from 'next/link';

import { useAuthContext } from '@/components/providers';
import { SanctuaryItem } from '@/components/sanctuaries/sanctuary-item';
import { PageBodyContainer, SpinnerPage } from '@/components/ui';
import { trpc } from '@/lib/http/client/trpc';

const SanctuariesPage = () => {
  const { user, loading: userIsLoading } = useAuthContext();

  const { data: sanctuariesData, isLoading: sanctuaryDataIsLoading } =
    trpc.getSanctuariesForAccount.useQuery(undefined, {
      enabled: !!user,
      staleTime: Infinity,
    });

  const dataIsLoading = userIsLoading || sanctuaryDataIsLoading;

  if (dataIsLoading) {
    return (
      <PageBodyContainer>
        <SpinnerPage />
      </PageBodyContainer>
    );
  }

  return (
    <PageBodyContainer>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <LinkMUI href="/sanctuaries/new" component={Link} sx={{ width: { xs: '100%', sm: '25%' } }}>
          <Button sx={{ width: '100%' }}>New Sanctuary</Button>
        </LinkMUI>
      </Box>

      {sanctuariesData?.sanctuaries.map(sanctuary => (
        <Box key={sanctuary.id}>
          <LinkMUI href={`/sanctuary/${sanctuary.id}/residents`} component={Link}>
            <SanctuaryItem {...sanctuary} />
          </LinkMUI>
        </Box>
      ))}
    </PageBodyContainer>
  );
};

export default SanctuariesPage;
