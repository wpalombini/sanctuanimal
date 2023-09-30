import { Avatar, Box, CardContent, Typography } from '@sanctuanimal/ui';
import { useRouter } from 'next/router';
import { CldImage } from 'next-cloudinary';

import { DisplayField } from '@/components/ui';
import { getLabelForGenderValue } from '@/lib/utils';

import { ResidentDetailsForm } from '../resident-details-edit';

type ResidentDetailsViewProps = {
  residentData?: ResidentDetailsForm;
};

const ResidentDetailsContainer = ({ children }: { children: React.ReactNode }) => (
  <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: { xs: 1, md: 5 } }}>
    {children}
  </Box>
);

const ResidentDetailsView = ({ residentData }: ResidentDetailsViewProps) => {
  const { query } = useRouter();
  const residentId = query.id as string;

  return (
    <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
        <Avatar sx={{ height: { xs: 50, md: 200 }, width: { xs: 50, md: 200 } }}>
          {residentData?.profileImageVersion ? (
            <CldImage
              alt="Resident profile picture"
              src={`sanctuanimal/profile/${residentId}`}
              version={residentData?.profileImageVersion}
              fill
            />
          ) : null}
        </Avatar>
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
