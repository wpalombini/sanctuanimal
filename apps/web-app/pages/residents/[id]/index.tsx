import { useRouter } from 'next/router';
import { useState } from 'react';

import { useAuthContext } from '@/components/providers';
import ResidentDetails from '@/components/residents/resident-details';
import { ResidentDetailsForm } from '@/components/residents/resident-details-edit';
import PageBodyContainer from '@/components/ui/page-body-container';
import SpinnerPage from '@/components/ui/spinner-page';
import { trpc } from '@/lib/http/client/trpc';
import { useNotificationStore } from '@/lib/stores';
import { NotificationError, NotificationSuccess } from '@/lib/types';

const ResidentDetailsPage = () => {
  const params = useRouter();
  const { user, loading: userIsLoading } = useAuthContext();
  const { setNotification } = useNotificationStore();
  const [editResident, setEditResident] = useState(false);

  const utils = trpc.useContext();

  const { data: residentData, isLoading: residentDataIsLoading } = trpc.getResidentById.useQuery(
    { id: params.query.id as string },
    {
      enabled: !!user,
      staleTime: Infinity,
    },
  );

  const { isLoading: updateResidentIsMutating, mutate: updateResident } =
    trpc.updateResident.useMutation({
      onSuccess(data) {
        utils.getResidentById.invalidate({ id: data.id });
        setNotification(NotificationSuccess);
        setEditResident(false);
      },
      onError(error) {
        console.error(`onError updateResident resident.id: ${residentData?.id}`, error);
        setNotification(NotificationError);
      },
    });

  const dataIsLoading = userIsLoading || residentDataIsLoading;

  const onUpdateResident = (formData: ResidentDetailsForm) => {
    updateResident({
      ...formData,
      id: residentData?.id as string,
    });
  };

  if (dataIsLoading) {
    return (
      <PageBodyContainer>
        <SpinnerPage />
      </PageBodyContainer>
    );
  }

  return (
    <PageBodyContainer>
      <ResidentDetails
        editResident={editResident}
        isMutating={updateResidentIsMutating}
        residentData={residentData as ResidentDetailsForm}
        setEditResident={setEditResident}
        upsertResident={onUpdateResident}
      />
    </PageBodyContainer>
  );
};

export default ResidentDetailsPage;
