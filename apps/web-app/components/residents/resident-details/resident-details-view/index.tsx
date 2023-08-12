import { CardContent } from '@sanctuanimal/ui';

import { DisplayField } from '@/components/ui';
import { getLabelForGenderValue } from '@/lib/utils';

import { ResidentDetailsForm } from '../resident-details-edit';

type ResidentDetailsViewProps = {
  residentData?: ResidentDetailsForm;
};

const ResidentDetailsView = ({ residentData }: ResidentDetailsViewProps) => {
  return (
    <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      <DisplayField label="Name" value={residentData?.name} />
      <DisplayField label="Species" value={residentData?.species} />
      <DisplayField label="Breed" value={residentData?.breed} />
      <DisplayField label="Gender" value={getLabelForGenderValue(residentData?.gender)} />
      <DisplayField label="DOB" value={residentData?.dateOfBirth as string} />
      <DisplayField label="Bio" value={residentData?.bio} />
    </CardContent>
  );
};

export default ResidentDetailsView;
