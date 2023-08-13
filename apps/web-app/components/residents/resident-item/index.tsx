import { Box, Card, CardContent, Typography, TypographyProps } from '@sanctuanimal/ui';
import React from 'react';

import { getLabelForGenderValue } from '@/lib/utils';

type ResidentItemProps = {
  breed: string;
  dateOfBirth: string | null;
  gender: string;
  name: string;
  species: string;
};

const ResidentItemLabel = ({ children }: { children: React.ReactNode }) => (
  <Typography variant="subtitle1">{children}</Typography>
);

const ResidentItemValue = (props: TypographyProps) => (
  <Typography {...props} noWrap fontWeight="500" />
);

const ResidentItemField = ({ children }: { children: React.ReactNode }) => (
  <Box sx={{ paddingX: 1, width: { xs: '100%', sm: '110px', md: '170px', xl: '200px' } }}>
    {children}
  </Box>
);

const ResidentItemFieldGroup = ({ children }: { children: React.ReactNode }) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: { xs: 'column', sm: 'row' },
      justifyContent: 'space-around',
      gap: 1,
    }}
  >
    {children}
  </Box>
);

export const ResidentItem = ({ resident }: { resident: ResidentItemProps }) => {
  return (
    <Card>
      <CardContent>
        <ResidentItemFieldGroup>
          {/* Name */}
          <ResidentItemField>
            <ResidentItemLabel>Name:</ResidentItemLabel>
            <ResidentItemValue sx={{ fontSize: '20px', lineHeight: '1.1' }}>
              {resident.name}
            </ResidentItemValue>
          </ResidentItemField>

          {/* Species */}
          <ResidentItemField>
            <ResidentItemLabel>Species:</ResidentItemLabel>
            <ResidentItemValue>{resident.species}</ResidentItemValue>
          </ResidentItemField>

          {/* Breed */}
          <ResidentItemField>
            <ResidentItemLabel>Breed:</ResidentItemLabel>
            <ResidentItemValue>{resident.breed}</ResidentItemValue>
          </ResidentItemField>

          {/* Gender */}
          <ResidentItemField>
            <ResidentItemLabel>Gender:</ResidentItemLabel>
            <ResidentItemValue>{getLabelForGenderValue(resident.gender)}</ResidentItemValue>
          </ResidentItemField>

          {/* DOB */}
          <ResidentItemField>
            <ResidentItemLabel>DOB:</ResidentItemLabel>
            <ResidentItemValue>{resident.dateOfBirth}</ResidentItemValue>
          </ResidentItemField>
        </ResidentItemFieldGroup>
      </CardContent>
    </Card>
  );
};
