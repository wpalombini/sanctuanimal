import { useRouter } from 'next/router';

import ResidentDetails from '@/components/residents/resident-details';
import PageBodyContainer from '@/components/ui/page-body-container';
import { trpc } from '@/lib/http/client/trpc';
import { useNotificationStore } from '@/lib/stores';
import { NotificationError, NotificationSuccess } from '@/lib/types';

const NewResidentPage = () => {
  const { replace } = useRouter();
  const { setNotification } = useNotificationStore();

  const { isLoading: createResidentIsMutating, mutate: createResident } =
    trpc.createResident.useMutation({
      onSuccess(data) {
        console.log(data);
        setNotification(NotificationSuccess);
        replace(`/residents/${data.id}`);
      },
      onError(error) {
        console.error('onError createResident', error);
        setNotification(NotificationError);
      },
    });

  return (
    <PageBodyContainer>
      <ResidentDetails
        editResident={true}
        isMutating={createResidentIsMutating}
        upsertResident={createResident}
      />
    </PageBodyContainer>
  );
};

export default NewResidentPage;
