import { Box, Link as LinkMUI } from '@sanctuanimal/ui';
import isEmpty from 'lodash-es/isEmpty';
import Link from 'next/link';

import { useAuthContext } from '@/components/providers';
import { ResidentItem } from '@/components/residents/resident-item';
import { NewResidentBtnContainer, PageBodyContainer, SpinnerPage } from '@/components/ui';
import { trpc } from '@/lib/http/client/trpc';

const ResidentsPage = () => {
  const { user, loading: userIsLoading } = useAuthContext();

  const { data: sanctuariesData } = trpc.getSanctuariesForAccount.useQuery(undefined, {
    enabled: !!user,
    staleTime: Infinity,
  });

  const { data: residentData, isLoading: residentDataIsLoading } = trpc.getResidents.useQuery(
    undefined,
    {
      enabled: !!user,
      staleTime: Infinity,
    },
  );

  const dataIsLoading = userIsLoading || residentDataIsLoading;

  if (dataIsLoading) {
    return (
      <PageBodyContainer>
        <SpinnerPage />
      </PageBodyContainer>
    );
  }

  return (
    <PageBodyContainer>
      {!isEmpty(sanctuariesData?.sanctuaries) && <NewResidentBtnContainer />}

      {residentData?.map(resident => (
        <Box key={resident.id}>
          <LinkMUI href={`/residents/${resident.id}`} component={Link}>
            <ResidentItem resident={resident} />
          </LinkMUI>
        </Box>
      ))}
    </PageBodyContainer>
  );
};

export default ResidentsPage;
