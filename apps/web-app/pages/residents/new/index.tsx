import ResidentDetails from '@/components/residents/resident-details';
import PageBodyContainer from '@/components/ui/page-body-container';

const NewResidentPage = () => {
  return (
    <PageBodyContainer>
      <ResidentDetails isMutating={false} />
    </PageBodyContainer>
  );
};

export default NewResidentPage;
