import { useState } from 'react';

import AccountDetails from '@/components/account/account-details';
import { useAuthContext } from '@/components/providers';
import { PageBodyContainer, SpinnerPage } from '@/components/ui';
import { trpc } from '@/lib/http/client/trpc';
import { useNotificationStore } from '@/lib/stores';
import { NotificationError, NotificationSuccess } from '@/lib/types';

const AccountPage = () => {
  const [editAccount, setEditAccount] = useState(false);
  const { user, loading: userIsLoading } = useAuthContext();
  const { setNotification } = useNotificationStore();

  const utils = trpc.useContext();

  const {
    data: sanctuariesData,
    isLoading: sanctuaryDataIsLoading,
    isRefetching: sanctuaryDataIsRefetching,
  } = trpc.getSanctuariesForAccount.useQuery(undefined, {
    enabled: !!user,
    staleTime: Infinity,
  });

  const dataIsLoading = userIsLoading || sanctuaryDataIsLoading || sanctuaryDataIsRefetching;

  const invalidateGetSanctuariesForAccount = () => {
    utils.getSanctuariesForAccount.invalidate();
  };

  const { isLoading: updateAccountIsMutating, mutate: updateAccount } =
    trpc.updateAccount.useMutation({
      onSuccess() {
        invalidateGetSanctuariesForAccount();
        setEditAccount(false);
        setNotification(NotificationSuccess);
      },
      onError(error) {
        console.error(`onError updateAccount account email: ${user?.email}`, error);
        setNotification(NotificationError);
      },
    });

  if (dataIsLoading) {
    return (
      <PageBodyContainer>
        <SpinnerPage />
      </PageBodyContainer>
    );
  }

  return (
    <PageBodyContainer>
      <AccountDetails
        account={sanctuariesData?.user}
        editAccount={editAccount}
        isMutating={updateAccountIsMutating}
        setEditAccount={setEditAccount}
        updateAccount={updateAccount}
      />
    </PageBodyContainer>
  );
};

export default AccountPage;
