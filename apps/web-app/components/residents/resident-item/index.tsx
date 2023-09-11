import { Card, CardContent } from '@sanctuanimal/ui';
import React from 'react';

import { ItemField, ItemFieldGroup, ItemLabel, ItemValue } from '@/components/ui/list-items';
import { getLabelForGenderValue } from '@/lib/utils';

type ResidentItemProps = {
  breed: string;
  dateOfBirth: string | null;
  gender: string;
  name: string;
  species: string;
};

export const ResidentItem = ({ resident }: { resident: ResidentItemProps }) => {
  return (
    <Card>
      <CardContent>
        <ItemFieldGroup>
          {/* Name */}
          <ItemField>
            <ItemLabel>Name:</ItemLabel>
            <ItemValue sx={{ fontSize: '20px', lineHeight: '1.1' }}>{resident.name}</ItemValue>
          </ItemField>

          {/* Species */}
          <ItemField>
            <ItemLabel>Species:</ItemLabel>
            <ItemValue>{resident.species}</ItemValue>
          </ItemField>

          {/* Breed */}
          <ItemField>
            <ItemLabel>Breed:</ItemLabel>
            <ItemValue>{resident.breed}</ItemValue>
          </ItemField>

          {/* Gender */}
          <ItemField>
            <ItemLabel>Gender:</ItemLabel>
            <ItemValue>{getLabelForGenderValue(resident.gender)}</ItemValue>
          </ItemField>

          {/* DOB */}
          <ItemField>
            <ItemLabel>DOB:</ItemLabel>
            <ItemValue>{resident.dateOfBirth}</ItemValue>
          </ItemField>
        </ItemFieldGroup>
      </CardContent>
    </Card>
  );
};
