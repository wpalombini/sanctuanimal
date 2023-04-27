import { trpc } from '@/lib/http/client/trpc';

const HomePage = () => {
  const { data } = trpc.hello.useQuery({ text: 'Walter' });

  return (
    <>
      <h2>Home Page</h2>
      <div>Message is: {data?.greeting}</div>
    </>
  );
};

export default HomePage;
