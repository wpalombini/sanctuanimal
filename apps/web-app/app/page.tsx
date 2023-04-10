import { Button } from 'ui';

const getUser = async () =>
  await fetch(`${process.env.BASE_URL}/api/user`, { cache: 'no-store' }).then((res) => res.json());

export default async function Web() {
  const user = await getUser();

  return (
    <div>
      <h1>SanctuAnimal</h1>
      {user && (
        <div>
          <div>id: {user.id}</div>
          <div>name: {user.name}</div>
        </div>
      )}
      <Button />
    </div>
  );
}
