import { useRouter } from 'next/router';

const ResidentDetailsPage = () => {
  const params = useRouter();

  return (
    <>
      <h2>Resident Details Page</h2>
      <h3>id: {params.query.id}</h3>
    </>
  );
};

export default ResidentDetailsPage;
