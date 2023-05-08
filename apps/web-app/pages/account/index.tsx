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

import { useAuthContext } from '@/components/providers';
import { trpc } from '@/lib/http/client/trpc';

const AccountPage = () => {
  const [editSanctuary, setEditSanctuary] = useState(false);
  const [editAccount, setEditAccount] = useState(false);
  const { user } = useAuthContext();

  const { data: sanctuariesData } = trpc.getSanctuariesForAccount.useQuery(undefined, {
    enabled: !!user,
    staleTime: Infinity,
  });

  const handleEditSanctuaryCancel = () => {
    setEditSanctuary(false);
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
          '> *': { marginBottom: { xs: '20px', lg: '40px' }, width: { xs: '100%', lg: '75%' } },
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
            {editSanctuary && <TextField label="Name" placeholder="Enter the sanctuary name" />}
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
              <Button>Save</Button>
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
