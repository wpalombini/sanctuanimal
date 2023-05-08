import { Card, CardContent, CardHeader, Container } from '@sanctuanimal/ui';

import { useAuthContext } from '@/components/providers';
import { trpc } from '@/lib/http/client/trpc';

const AccountPage = () => {
  const { user } = useAuthContext();

  const { data: sanctuariesData } = trpc.getSanctuariesForAccount.useQuery(undefined, {
    enabled: !!user,
    staleTime: Infinity,
  });

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
        <Card>
          <CardHeader title="Sanctuary details" />
          <CardContent>The content</CardContent>
        </Card>
        <Card>
          <CardHeader title="Account details" />
          <CardContent>The content</CardContent>
        </Card>
      </Container>
    </>
  );
};

export default AccountPage;
