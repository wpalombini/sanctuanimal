import { useState } from 'react';

import SanctuaryDetails from '@/components/sanctuaries/sanctuary-details';
import { SanctuaryDetailsForm } from '@/components/sanctuaries/sanctuary-details/sanctuary-details-edit';
import { trpc } from '@/lib/http/client/trpc';
import { useNotificationStore } from '@/lib/stores';
import { NotificationError, NotificationSuccess, SanctuaryOutput } from '@/lib/types';

export const SanctuaryDetailsContainer = ({
  sanctuaryData,
}: {
  sanctuaryData?: SanctuaryOutput;
}) => {
  const { setNotification } = useNotificationStore();
  const [editSanctuary, setEditSanctuary] = useState(false);

  const utils = trpc.useContext();

  const { isLoading: sanctuaryIsMutating, mutate: updateSanctuary } =
    trpc.updateSanctuary.useMutation({
      onSuccess(data, variables) {
        utils.getSanctuaryById.invalidate({ id: variables.id });
        utils.getSanctuariesForAccount.invalidate();
        setEditSanctuary(false);
        setNotification(NotificationSuccess);
      },
      onError(error) {
        console.error('onError upsertSanctuary', error);
        setNotification(NotificationError);
      },
    });

  const onUpdateSanctuary = (formData: SanctuaryDetailsForm) => {
    updateSanctuary({
      ...formData,
      id: sanctuaryData?.id as string,
    });
  };

  return (
    <>
      <SanctuaryDetails
        editSanctuary={editSanctuary}
        isMutating={sanctuaryIsMutating}
        sanctuary={sanctuaryData}
        setEditSanctuary={setEditSanctuary}
        upsertSanctuary={onUpdateSanctuary}
      />
    </>
  );
};
