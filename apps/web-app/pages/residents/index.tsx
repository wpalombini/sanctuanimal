import isEmpty from 'lodash-es/isEmpty';
import Link from 'next/link';

import { useAuthContext } from '@/components/providers';
import { NewResidentBtnContainer } from '@/components/ui/new-resident-btn';
import PageBodyContainer from '@/components/ui/page-body-container';
import SpinnerPage from '@/components/ui/spinner-page';
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
        <Link href={`/residents/${resident.id}`} key={resident.id}>
          {resident.name}
        </Link>
      ))}
    </PageBodyContainer>
  );
};

export default ResidentsPage;
