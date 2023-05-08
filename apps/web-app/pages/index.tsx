import { Button } from '@sanctuanimal/ui';

import { useAuthContext } from '@/components/providers';
import { trpc } from '@/lib/http/client/trpc';

const HomePage = () => {
  // const { user } = useAuthContext();
  // const { data, refetch } = trpc.secret.useQuery({ text: 'Walter' }, { enabled: !!user });

  return (
    <>
      <h2>Home Page</h2>
      {/* <div>Message is: {data?.greeting}</div> */}
      <div>{/* <Button onClick={() => refetch()}>Update!</Button> */}</div>
    </>
  );
};

export default HomePage;
