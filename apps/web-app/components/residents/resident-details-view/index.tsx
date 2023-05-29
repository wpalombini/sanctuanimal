import { CardContent } from '@sanctuanimal/ui';

import DisplayField from '@/components/ui/display-field';
import { getFormattedDate, getLabelForGenderValue } from '@/lib/utils';

import { ResidentDetailsForm } from '../resident-details-edit';

type ResidentDetailsViewProps = {
  residentData?: ResidentDetailsForm;
};

const ResidentDetailsView = ({ residentData }: ResidentDetailsViewProps) => {
  return (
    <CardContent>
      <DisplayField label="Name" value={residentData?.name} />
      <DisplayField label="Species" value={residentData?.species} />
      <DisplayField label="Breed" value={residentData?.breed} />
      <DisplayField label="Gender" value={getLabelForGenderValue(residentData?.gender)} />
      <DisplayField label="DOB" value={getFormattedDate(residentData?.dateOfBirth)} />
      <DisplayField label="Bio" value={residentData?.bio} />
    </CardContent>
  );
};

export default ResidentDetailsView;
