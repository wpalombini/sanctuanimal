import { Box, CardContent, Typography } from '@sanctuanimal/ui';

import { DisplayField } from '@/components/ui';
import { getLabelForGenderValue } from '@/lib/utils';

import { ResidentDetailsForm } from '../resident-details-edit';
import { ResidentDetailsProfileImageEditor } from './profile-image-editor';

export type ResidentDetailsFormProps = {
  id: string;
} & ResidentDetailsForm;

type ResidentDetailsViewProps = {
  residentData?: ResidentDetailsFormProps;
};

const ResidentDetailsContainer = ({ children }: { children: React.ReactNode }) => (
  <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: { xs: 1, md: 5 } }}>
    {children}
  </Box>
);

const ResidentDetailsView = ({ residentData }: ResidentDetailsViewProps) => {
  return (
    <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
        <ResidentDetailsProfileImageEditor
          residentId={residentData?.id}
          profileImageVersion={residentData?.profileImageVersion}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, padding: { xs: 0, md: 5 } }}>
          <Typography variant="h4" noWrap>
            {residentData?.name}
          </Typography>
          <Typography variant="subtitle1">{residentData?.bio}</Typography>
        </Box>
      </Box>
      <ResidentDetailsContainer>
        <ResidentDetailsContainer>
          <DisplayField label="Species" value={residentData?.species} />
          <DisplayField label="Breed" value={residentData?.breed} />
        </ResidentDetailsContainer>
        <ResidentDetailsContainer>
          <DisplayField label="Gender" value={getLabelForGenderValue(residentData?.gender)} />
          <DisplayField label="DOB" value={residentData?.dateOfBirth as string} />
        </ResidentDetailsContainer>
      </ResidentDetailsContainer>
    </CardContent>
  );
};

export default ResidentDetailsView;
