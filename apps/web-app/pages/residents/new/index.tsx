import { useRouter } from 'next/router';

import ResidentDetails from '@/components/residents/resident-details';
import { ResidentDetailsForm } from '@/components/residents/resident-details-edit';
import PageBodyContainer from '@/components/ui/page-body-container';
import { trpc } from '@/lib/http/client/trpc';
import { useNotificationStore } from '@/lib/stores';
import { NotificationError, NotificationSuccess } from '@/lib/types';

const NewResidentPage = () => {
  const { replace } = useRouter();
  const { setNotification } = useNotificationStore();

  const utils = trpc.useContext();

  const { isLoading: createResidentIsMutating, mutate: createResident } =
    trpc.createResident.useMutation({
      onSuccess(data) {
        utils.getResidents.invalidate();
        setNotification(NotificationSuccess);
        replace(`/residents/${data.id}`);
      },
      onError(error) {
        console.error('onError createResident', error);
        setNotification(NotificationError);
      },
    });

  const onCreateResident = (formData: ResidentDetailsForm) => {
    createResident({
      ...formData,
      dateOfBirth: formData.dateOfBirth ? (formData.dateOfBirth as string) : null,
    });
  };

  return (
    <PageBodyContainer>
      <ResidentDetails
        editResident={true}
        isMutating={createResidentIsMutating}
        upsertResident={onCreateResident}
      />
    </PageBodyContainer>
  );
};

export default NewResidentPage;
