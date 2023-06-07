import { Box, Card, CardContent, Typography, TypographyTypeMap } from '@sanctuanimal/ui';
import React from 'react';

import { getLabelForGenderValue } from '@/lib/utils';

type ResidentItem = {
  bio: string | null;
  breed: string;
  dateOfBirth: string | null;
  gender: string;
  name: string;
  species: string;
};

const ResidentItemLabel = ({ children }: { children: React.ReactNode }) => (
  <Typography variant="body2" gutterBottom>
    {children}
  </Typography>
);

const ResidentItemValue = ({
  children,
  variant = 'body1',
}: {
  children: React.ReactNode;
  variant?: TypographyTypeMap['props']['variant'];
}) => (
  <Typography variant={variant} noWrap fontWeight="500">
    {children}
  </Typography>
);

const ResidentItemField = ({ children }: { children: React.ReactNode }) => (
  <Box sx={{ paddingX: '5px', width: { xs: '100%', sm: '110px', md: '170px', xl: '200px' } }}>
    {children}
  </Box>
);

const ResidentItemFieldGroup = ({ children }: { children: React.ReactNode }) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: { xs: 'column', sm: 'row' },
      justifyContent: 'space-around',
    }}
  >
    {children}
  </Box>
);

export const ResidentItem = ({ resident }: { resident: ResidentItem }) => {
  return (
    <Card>
      <CardContent>
        <ResidentItemFieldGroup>
          {/* Name */}
          <ResidentItemField>
            <ResidentItemLabel>Name:</ResidentItemLabel>
            <ResidentItemValue variant="h6">{resident.name}</ResidentItemValue>
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
