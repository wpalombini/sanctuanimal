import { Box, CardContent, Typography } from '@sanctuanimal/ui';

import { DisplayField } from '@/components/ui';
import { SanctuaryOutput } from '@/lib/types';

type SanctuaryDetailsViewProps = {
  sanctuary?: SanctuaryOutput | undefined;
};

export const SanctuaryDetailsView = ({ sanctuary }: SanctuaryDetailsViewProps) => {
  return (
    <CardContent>
      {!sanctuary && (
        <Typography>Click on the pencil icon to start editing this section!</Typography>
      )}
      {!!sanctuary && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-around',
            flexDirection: { xs: 'column', sm: 'row' },
          }}
        >
          <DisplayField label="Name" value={sanctuary.name} />
          <DisplayField label="Contact" value={sanctuary.contact} />
          <DisplayField label="Your role" value={sanctuary.role} />
        </Box>
      )}
    </CardContent>
  );
};
