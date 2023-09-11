import { Box, Card, CardContent, CreateIcon, IconButton } from '@sanctuanimal/ui';

import { ItemField, ItemFieldGroup, ItemLabel, ItemValue } from '@/components/ui/list-items';

type SanctuaryItemProps = {
  contact: string;
  name: string;
  role: string;
};

export const SanctuaryItem = ({ contact, name, role }: SanctuaryItemProps) => {
  return (
    <Card>
      <CardContent>
        <ItemFieldGroup>
          {/* Name */}
          <ItemField>
            <ItemLabel>Name:</ItemLabel>
            <ItemValue sx={{ fontSize: '20px', lineHeight: '1.1' }}>{name}</ItemValue>
          </ItemField>

          {/* Contact */}
          <ItemField>
            <ItemLabel>Contact:</ItemLabel>
            <ItemValue>{contact}</ItemValue>
          </ItemField>

          {/* Role */}
          <ItemField>
            <ItemLabel>Role:</ItemLabel>
            <ItemValue>{role}</ItemValue>
          </ItemField>

          {/* Action */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              aria-label="edit sanctuary"
              onClick={e => {
                e.preventDefault();
                console.log();
              }}
            >
              <CreateIcon />
            </IconButton>
          </Box>
        </ItemFieldGroup>
      </CardContent>
    </Card>
  );
};
