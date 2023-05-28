import { Card, CardHeader } from '@sanctuanimal/ui';

import ResidentDetailsEdit, { ResidentDetailsForm } from '../resident-details-edit';

export type ResidentDetailsProps = {
  editResident: boolean;
  isMutating: boolean;
  // setEditResident: (value: boolean) => void;
  upsertResident: (values: ResidentDetailsForm) => void;
};

const ResidentDetails = ({ editResident, isMutating, upsertResident }: ResidentDetailsProps) => {
  const onUpsertResident = (formData: ResidentDetailsForm) => {
    upsertResident(formData);
  };

  return (
    <Card>
      <CardHeader title="Resident details" />
      {editResident && (
        <ResidentDetailsEdit isMutating={isMutating} upsertResident={onUpsertResident} />
      )}
    </Card>
  );
};

export default ResidentDetails;
