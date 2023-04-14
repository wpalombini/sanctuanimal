import { PrismaClient } from '@sanctuanimal/orm';
import { Button } from 'ui';

const getUser = async () =>
  await fetch(`${process.env.BASE_URL}/api/user`, { cache: 'no-store' }).then((res) => res.json());

const test = async () => {
  const prisma = new PrismaClient();
  const result = await prisma.user.findUnique({
    where: { email: 'walter@palombini.com' },
  });

  console.log(result);
};

export default async function Web() {
  const user = await getUser();

  try {
    await test();
  } catch (error) {
    console.log('err', error);
  }

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
