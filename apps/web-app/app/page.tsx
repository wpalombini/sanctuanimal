import { PrismaClient } from '@sanctuanimal/orm';

const getUser = async () =>
  await fetch(`${process.env.BASE_URL}/api/user`, { cache: 'no-store' }).then(res => res.json());

// const test = async () => {
//   const prisma = new PrismaClient();
//   const result = await prisma.user.findUnique({
//     where: { email: 'walter@palombini.com' },
//   });

//   console.log(result);
// };

const Web = async () => {
  const user = await getUser();

  // try {
  //   await test();
  // } catch (error) {
  //   console.log('err', error);
  // }

  return (
    <div>
      {user && (
        <div>
          <div>id: {user.id}</div>
          <div>name: {user.name}</div>
        </div>
      )}
    </div>
  );
};

export default Web;
