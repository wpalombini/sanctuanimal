import { useRouter } from 'next/router';

import SanctuaryDetails from '@/components/sanctuaries/sanctuary-details';
import { SanctuaryDetailsForm } from '@/components/sanctuaries/sanctuary-details/sanctuary-details-edit';
import { BackComponent, PageBodyContainer } from '@/components/ui';
import { trpc } from '@/lib/http/client/trpc';
import { useNotificationStore } from '@/lib/stores';
import { NotificationError, NotificationSuccess } from '@/lib/types';

const NewSanctuaryPage = () => {
  const { replace } = useRouter();
  const { setNotification } = useNotificationStore();

  const utils = trpc.useContext();

  const { isLoading: createSanctuaryIsMutating, mutate: createSanctuary } =
    trpc.createSanctuary.useMutation({
      onSuccess(data) {
        utils.getSanctuariesForAccount.invalidate();
        setNotification(NotificationSuccess);
        replace(`/sanctuaries/${data.id}`);
      },
      onError(error) {
        console.error('onError createSanctuary', error);
        setNotification(NotificationError);
      },
    });

  const onCreateSanctuary = (formData: SanctuaryDetailsForm) => {
    createSanctuary({
      ...formData,
    });
  };

  return (
    <PageBodyContainer>
      <BackComponent />
      <SanctuaryDetails
        editSanctuary={true}
        isMutating={createSanctuaryIsMutating}
        upsertSanctuary={onCreateSanctuary}
      />
    </PageBodyContainer>
  );
};

export default NewSanctuaryPage;
