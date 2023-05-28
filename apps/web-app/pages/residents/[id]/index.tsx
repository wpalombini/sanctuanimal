import { useRouter } from 'next/router';

import { useAuthContext } from '@/components/providers';
import ResidentDetails from '@/components/residents/resident-details';
import { ResidentDetailsForm } from '@/components/residents/resident-details-edit';
import PageBodyContainer from '@/components/ui/page-body-container';
import SpinnerPage from '@/components/ui/spinner-page';
import { trpc } from '@/lib/http/client/trpc';

const ResidentDetailsPage = () => {
  const params = useRouter();

  const { user, loading: userIsLoading } = useAuthContext();

  const { data: residentData, isLoading: residentDataIsLoading } = trpc.getResidentById.useQuery(
    { id: params.query.id as string },
    {
      enabled: !!user,
      staleTime: Infinity,
    },
  );

  const dataIsLoading = userIsLoading || residentDataIsLoading;

  if (dataIsLoading) {
    return <SpinnerPage />;
  }

  const upsertResident = (formData: ResidentDetailsForm) => {
    console.log(formData);
  };

  return (
    <PageBodyContainer>
      <ResidentDetails
        editResident={true}
        isMutating={false}
        residentData={residentData as ResidentDetailsForm}
        upsertResident={upsertResident}
      />
    </PageBodyContainer>
  );
};

export default ResidentDetailsPage;
