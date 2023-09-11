import { useRouter } from 'next/router';
import { useState } from 'react';

import { useAuthContext } from '@/components/providers';
import SanctuaryDetails from '@/components/sanctuaries/sanctuary-details';
import { SanctuaryDetailsForm } from '@/components/sanctuaries/sanctuary-details/sanctuary-details-edit';
import {
  BackComponent,
  NewResidentBtnContainer,
  PageBodyContainer,
  SpinnerPage,
} from '@/components/ui';
import { trpc } from '@/lib/http/client/trpc';
import { useNotificationStore } from '@/lib/stores';
import { NotificationError, NotificationSuccess } from '@/lib/types';

const SanctuaryDetailsPage = () => {
  const params = useRouter();
  const { user, loading: userIsLoading } = useAuthContext();
  const { setNotification } = useNotificationStore();
  const [editSanctuary, setEditSanctuary] = useState(false);

  const utils = trpc.useContext();

  const { data: sanctuaryData, isLoading: sanctuaryDataIsLoading } = trpc.getSanctuaryById.useQuery(
    { id: params.query.id as string },
    {
      enabled: !!user,
      staleTime: Infinity,
    },
  );

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

  const dataIsLoading = userIsLoading || sanctuaryDataIsLoading;

  const onUpdateSanctuary = (formData: SanctuaryDetailsForm) => {
    updateSanctuary({
      ...formData,
      id: sanctuaryData?.id as string,
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
      <BackComponent />
      {sanctuaryData?.id && <NewResidentBtnContainer sanctuaryId={sanctuaryData.id} />}
      <SanctuaryDetails
        editSanctuary={editSanctuary}
        isMutating={sanctuaryIsMutating}
        sanctuary={sanctuaryData}
        setEditSanctuary={setEditSanctuary}
        upsertSanctuary={onUpdateSanctuary}
      />
    </PageBodyContainer>
  );
};

export default SanctuaryDetailsPage;
