import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CreateIcon,
  IconButton,
  TextField,
  Typography,
} from '@sanctuanimal/ui';
import { useForm } from 'react-hook-form';
import { TypeOf } from 'zod';

import { AccountOutput } from '@/lib/types';
import { updateAccountSchema } from '@/lib/validation/account-details.schema';

type AccountDetailsForm = TypeOf<typeof updateAccountSchema>;

export type AccountDetailsProps = {
  account: AccountOutput | undefined;
  editAccount: boolean;
  isMutating: boolean;
  setEditAccount: (value: boolean) => void;
  updateAccount: (values: AccountDetailsForm) => void;
};

const AccountDetails = ({
  account,
  editAccount,
  isMutating,
  setEditAccount,
  updateAccount,
}: AccountDetailsProps) => {
  const accountForm = useForm<AccountDetailsForm>({
    mode: 'onChange',
    resolver: zodResolver(updateAccountSchema),
  });

  const onSubmitAccountDetailsHandler = (values: AccountDetailsForm) => {
    updateAccount(values);
  };

  const handleEditAccountCancel = () => {
    setEditAccount(false);
    accountForm.clearErrors();
    accountForm.reset();
  };

  return (
    <Card>
      <CardHeader
        title="Account details"
        action={
          !editAccount && (
            <IconButton aria-label="edit account" onClick={() => setEditAccount(true)}>
              <CreateIcon />
            </IconButton>
          )
        }
      />
      {editAccount && (
        <form autoComplete="off" onSubmit={accountForm.handleSubmit(onSubmitAccountDetailsHandler)}>
          <CardContent
            sx={{
              '& .MuiTextField-root:not(:last-child)': { marginBottom: '40px' },
            }}
          >
            <TextField
              label="Name *"
              placeholder="Enter the account name"
              defaultValue={account?.name || ''}
              {...accountForm.register('name')}
              error={!!accountForm.formState.errors.name}
              helperText={accountForm.formState.errors.name?.message || ''}
            />
          </CardContent>
          <CardContent sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              onClick={() => handleEditAccountCancel()}
              color="secondary"
              sx={{ marginRight: '5px' }}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isMutating}>
              Save
            </Button>
          </CardContent>
        </form>
      )}
      {!editAccount && (
        <CardContent>
          {!account && (
            <Typography>Click on the pencil icon to start editing this section!</Typography>
          )}
          {!!account && (
            <>
              <section>
                <Typography variant="subtitle1">Name:</Typography>
                <Typography variant="h6" gutterBottom>
                  {account?.name}
                </Typography>
              </section>
            </>
          )}
        </CardContent>
      )}
    </Card>
  );
};

export default AccountDetails;
