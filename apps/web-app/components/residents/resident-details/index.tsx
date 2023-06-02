import { Card, CardHeader, CreateIcon, IconButton } from '@sanctuanimal/ui';

import ResidentDetailsEdit, { ResidentDetailsForm } from '../resident-details-edit';
import ResidentDetailsView from '../resident-details-view';

export type ResidentDetailsProps = {
  editResident: boolean;
  isMutating: boolean;
  residentData?: ResidentDetailsForm;
  setEditResident?: (value: boolean) => void;
  upsertResident: (values: ResidentDetailsForm) => void;
};

const ResidentDetails = ({
  editResident,
  isMutating,
  residentData,
  setEditResident,
  upsertResident,
}: ResidentDetailsProps) => {
  const onUpsertResident = (formData: ResidentDetailsForm) => {
    upsertResident({
      ...formData,
      dateOfBirth: formData.dateOfBirth as string,
    });
  };

  return (
    <Card>
      <CardHeader
        title="Resident details"
        action={
          !editResident && (
            <IconButton aria-label="edit resident" onClick={() => setEditResident?.(true)}>
              <CreateIcon />
            </IconButton>
          )
        }
      />
      {editResident && (
        <ResidentDetailsEdit
          isMutating={isMutating}
          residentData={residentData}
          setEditResident={setEditResident}
          upsertResident={onUpsertResident}
        />
      )}
      {!editResident && <ResidentDetailsView residentData={residentData} />}
    </Card>
  );
};

export default ResidentDetails;
