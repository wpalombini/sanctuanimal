import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  CreateIcon,
  IconButton,
  TextField,
  Typography,
} from '@sanctuanimal/ui';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { TypeOf } from 'zod';

import { useAuthContext } from '@/components/providers';
import { trpc } from '@/lib/http/client/trpc';
import { upsertSanctuarySchema } from '@/lib/validation/sanctuary-schema';

type SanctuaryDetails = TypeOf<typeof upsertSanctuarySchema>;

const AccountPage = () => {
  const [editSanctuary, setEditSanctuary] = useState(false);
  const [editAccount, setEditAccount] = useState(false);
  const { user } = useAuthContext();

  const utils = trpc.useContext();

  const { data: sanctuariesData, isLoading } = trpc.getSanctuariesForAccount.useQuery(undefined, {
    enabled: !!user,
    staleTime: Infinity,
  });

  const { isLoading: isMutating, mutate: upsertSanctuary } = trpc.upsertSanctuary.useMutation({
    onSuccess() {
      utils.invalidate(undefined, { queryKey: ['getSanctuariesForAccount'] });
      setEditSanctuary(false);
      // display successful message (toast)
    },
    onError(error) {
      console.log('onError', error);
    },
  });
  const sanctuaryForm = useForm<SanctuaryDetails>({
    mode: 'onChange',
    resolver: zodResolver(upsertSanctuarySchema),
  });

  const onSubmitSanctuaryDetailsHandler = (values: SanctuaryDetails) => {
    upsertSanctuary(values);
  };

  const handleEditSanctuaryCancel = () => {
    setEditSanctuary(false);
    sanctuaryForm.clearErrors();
    sanctuaryForm.reset();
  };

  return (
    <>
      <Container
        maxWidth={false}
        disableGutters
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          '> *': { marginBottom: { xs: '20px', lg: '50px' }, width: { xs: '100%', lg: '75%' } },
          '& .MuiTextField-root:not(:last-child)': { marginBottom: '40px' },
        }}
      >
        {/* Sanctuary details */}
        <Card>
          <CardHeader
            title="Sanctuary details"
            action={
              !editSanctuary && (
                <IconButton aria-label="edit sanctuary" onClick={() => setEditSanctuary(true)}>
                  <CreateIcon />
                </IconButton>
              )
            }
          />
          {editSanctuary && (
            <form onSubmit={sanctuaryForm.handleSubmit(onSubmitSanctuaryDetailsHandler)}>
              <CardContent>
                <TextField
                  label="Name"
                  placeholder="Enter the sanctuary name"
                  defaultValue={sanctuariesData?.sanctuaries[0]?.name || ''}
                  {...sanctuaryForm.register('name')}
                  error={!!sanctuaryForm.formState.errors.name}
                  helperText={sanctuaryForm.formState.errors.name?.message || ''}
                />
                <TextField
                  label="Contact"
                  placeholder="A contact person at the sanctuary"
                  defaultValue={sanctuariesData?.sanctuaries[0]?.contact || ''}
                  {...sanctuaryForm.register('contact')}
                  error={!!sanctuaryForm.formState.errors.contact}
                  helperText={sanctuaryForm.formState.errors.contact?.message || ''}
                />
              </CardContent>
              <CardContent sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  onClick={() => handleEditSanctuaryCancel()}
                  color="secondary"
                  sx={{ marginRight: '5px' }}
                >
                  Cancel
                </Button>
                <Button type="submit">Save</Button>
              </CardContent>
            </form>
          )}
          {!editSanctuary && (
            <CardContent sx={{ '> section:not(:last-child)': { marginBottom: '20px' } }}>
              {!sanctuariesData?.sanctuaries?.length && (
                <Typography>Click on the pencil icon to start editing this section!</Typography>
              )}
              {sanctuariesData?.sanctuaries?.length && (
                <>
                  <section>
                    <Typography variant="subtitle1">Name:</Typography>
                    <Typography variant="h6" gutterBottom>
                      {sanctuariesData?.sanctuaries[0]?.name}
                    </Typography>
                  </section>
                  <section>
                    <Typography variant="subtitle1">Contact:</Typography>
                    <Typography variant="h6" gutterBottom>
                      {sanctuariesData?.sanctuaries[0]?.contact}
                    </Typography>
                  </section>
                </>
              )}
            </CardContent>
          )}
        </Card>
        {/* Account details */}
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
          <CardContent>The content</CardContent>
        </Card>
      </Container>
    </>
  );
};

export default AccountPage;
