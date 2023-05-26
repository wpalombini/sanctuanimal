import { Box, Button, Container } from '@sanctuanimal/ui';
import isEmpty from 'lodash-es/isEmpty';
import { useRouter } from 'next/router';
import { useState } from 'react';

import AccountDetails from '@/components/account/account-details';
import { useAuthContext } from '@/components/providers';
import SanctuaryDetails from '@/components/sanctuary/sanctuary-details';
import SpinnerPage from '@/components/ui/spinner-page';
import { trpc } from '@/lib/http/client/trpc';
import { useNotificationStore } from '@/lib/stores';
import { NotificationError, NotificationSuccess } from '@/lib/types';

const AccountPage = () => {
  const router = useRouter();
  const [editSanctuary, setEditSanctuary] = useState(false);
  const [editAccount, setEditAccount] = useState(false);
  const { user, loading: userIsLoading } = useAuthContext();
  const { setNotification } = useNotificationStore();

  const utils = trpc.useContext();

  const { data: sanctuariesData, isLoading: sanctuaryDataIsLoading } =
    trpc.getSanctuariesForAccount.useQuery(undefined, {
      enabled: !!user,
      staleTime: Infinity,
    });

  const dataIsLoading = userIsLoading || sanctuaryDataIsLoading;

  const invalidateGetSanctuariesForAccount = () => {
    utils.invalidate(undefined, { queryKey: ['getSanctuariesForAccount'] });
  };

  const { isLoading: upsertSanctuaryIsMutating, mutate: upsertSanctuary } =
    trpc.upsertSanctuary.useMutation({
      onSuccess() {
        invalidateGetSanctuariesForAccount();
        setEditSanctuary(false);
        setNotification(NotificationSuccess);
      },
      onError(error) {
        console.log('onError', error);
        setNotification(NotificationError);
      },
    });

  const { isLoading: updateAccountIsMutating, mutate: updateAccount } =
    trpc.updateAccount.useMutation({
      onSuccess() {
        invalidateGetSanctuariesForAccount();
        setEditAccount(false);
        setNotification(NotificationSuccess);
      },
      onError(error) {
        console.log('onError', error);
        setNotification(NotificationError);
      },
    });

  if (dataIsLoading) {
    return <SpinnerPage />;
  }

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        '> *': { marginBottom: '20px', width: { xs: '100%', lg: '75%' } },
      }}
    >
      {!isEmpty(sanctuariesData?.sanctuaries) && (
        <Box component="section" sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            onClick={() => router.push('/residents/new')}
            sx={{ width: { xs: '100%', sm: '25%' } }}
          >
            New resident
          </Button>
        </Box>
      )}

      <SanctuaryDetails
        editSanctuary={editSanctuary}
        isMutating={upsertSanctuaryIsMutating}
        sanctuaries={sanctuariesData?.sanctuaries}
        setEditSanctuary={setEditSanctuary}
        upsertSanctuary={upsertSanctuary}
      />
      <AccountDetails
        account={sanctuariesData?.user}
        editAccount={editAccount}
        isMutating={updateAccountIsMutating}
        setEditAccount={setEditAccount}
        updateAccount={updateAccount}
      />
    </Container>
  );
};

export default AccountPage;
