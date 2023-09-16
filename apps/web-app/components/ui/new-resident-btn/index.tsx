import { Box, Button, Link as LinkMUI } from '@sanctuanimal/ui';
import Link from 'next/link';

export const NewResidentBtnContainer = ({ sanctuaryId }: { sanctuaryId: string }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
      <LinkMUI
        href={`/sanctuaries/${sanctuaryId}/residents/new`}
        component={Link}
        sx={{ width: { xs: '100%', sm: '25%' } }}
      >
        <Button sx={{ width: '100%' }}>New resident</Button>
      </LinkMUI>
    </Box>
  );
};
