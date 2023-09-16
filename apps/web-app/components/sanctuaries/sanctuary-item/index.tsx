import { Box, Card, CardContent } from '@sanctuanimal/ui';

import { ItemLabel, ItemValue } from '@/components/ui/list-items';

type SanctuaryItemProps = {
  contact: string;
  name: string;
  role: string;
};

export const SanctuaryItem = ({ contact, name, role }: SanctuaryItemProps) => {
  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            {/* Name */}
            <Box sx={{ paddingX: 1 }}>
              <ItemLabel>Name:</ItemLabel>
              <ItemValue sx={{ fontSize: '20px', lineHeight: '1.1' }}>{name}</ItemValue>
            </Box>
          </Box>

          {/* Contact */}
          <Box sx={{ paddingX: 1 }}>
            <ItemLabel>Contact:</ItemLabel>
            <ItemValue>{contact}</ItemValue>
          </Box>

          {/* Role */}
          <Box sx={{ paddingX: 1, width: { xs: '100%', sm: '50%' } }}>
            <ItemLabel>Your role:</ItemLabel>
            <ItemValue>{role}</ItemValue>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
