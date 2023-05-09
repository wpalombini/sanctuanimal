import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  CreateIcon,
  IconButton,
  TextField,
  TextFieldProps,
  Typography,
} from '@sanctuanimal/ui';
import { useRef, useState } from 'react';

import { useAuthContext } from '@/components/providers';
import { trpc } from '@/lib/http/client/trpc';

const AccountPage = () => {
  const [editSanctuary, setEditSanctuary] = useState(false);
  const [editAccount, setEditAccount] = useState(false);
  const { user } = useAuthContext();

  const utils = trpc.useContext();

  const { data: sanctuariesData } = trpc.getSanctuariesForAccount.useQuery(undefined, {
    enabled: !!user,
    staleTime: Infinity,
  });

  const { isLoading, mutate: createOrUpdateSanctuary } = trpc.createOrUpdateSanctuary.useMutation({
    onSuccess() {
      console.log('onSuccess');
      utils.invalidate(undefined, { queryKey: ['getSanctuariesForAccount'] });
      // display successful message (toast)
    },
    onError(error) {
      console.log('onError', error);
    },
  });

  const sanctuaryNameRef = useRef<TextFieldProps>();
  const sanctuaryContactRef = useRef<TextFieldProps>();

  const handleEditSanctuaryCancel = () => {
    setEditSanctuary(false);
  };

  const handleEditSanctuarySave = () => {
    if (sanctuaryNameRef.current?.value && sanctuaryContactRef.current?.value) {
      createOrUpdateSanctuary({
        contact: sanctuaryContactRef.current?.value as string,
        name: sanctuaryNameRef.current.value as string,
      });

      setEditSanctuary(false);
    }
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
          <CardContent>
            {editSanctuary && (
              <>
                <TextField
                  inputRef={sanctuaryNameRef}
                  label="Name"
                  placeholder="Enter the sanctuary name"
                  defaultValue={sanctuariesData?.sanctuaries[0].name}
                />
                <TextField
                  inputRef={sanctuaryContactRef}
                  label="Contact"
                  placeholder="A contact person at the sanctuary"
                  defaultValue={sanctuariesData?.sanctuaries[0].contact}
                />
              </>
            )}
            {!sanctuariesData?.sanctuaries?.length && !editSanctuary && (
              <Typography>Click on the pencil icon to start editing this section!</Typography>
            )}
          </CardContent>
          {editSanctuary && (
            <CardContent sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                onClick={() => handleEditSanctuaryCancel()}
                color="secondary"
                sx={{ marginRight: '5px' }}
              >
                Cancel
              </Button>
              <Button onClick={() => handleEditSanctuarySave()}>Save</Button>
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
