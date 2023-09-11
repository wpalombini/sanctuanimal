import { Card, CardHeader, CreateIcon, IconButton } from '@sanctuanimal/ui';

import { SanctuaryOutput } from '@/lib/types';

import { SanctuaryDetailsEdit, SanctuaryDetailsForm } from './sanctuary-details-edit';
import { SanctuaryDetailsView } from './sanctuary-details-view';

export type SanctuaryDetailsProps = {
  editSanctuary: boolean;
  isMutating: boolean;
  sanctuary?: SanctuaryOutput;
  setEditSanctuary?: (value: boolean) => void;
  upsertSanctuary: (values: SanctuaryDetailsForm) => void;
};

const SanctuaryDetails = ({
  editSanctuary,
  isMutating,
  sanctuary,
  setEditSanctuary,
  upsertSanctuary,
}: SanctuaryDetailsProps) => {
  const onUpsertSanctuary = (values: SanctuaryDetailsForm) => {
    upsertSanctuary(values);
  };

  return (
    <Card>
      <CardHeader
        title="Sanctuary details"
        action={
          !editSanctuary && (
            <IconButton aria-label="edit sanctuary" onClick={() => setEditSanctuary?.(true)}>
              <CreateIcon />
            </IconButton>
          )
        }
      />
      {editSanctuary && (
        <SanctuaryDetailsEdit
          sanctuary={sanctuary}
          isMutating={isMutating}
          setEditSanctuary={setEditSanctuary}
          upsertSanctuary={onUpsertSanctuary}
        />
      )}
      {!editSanctuary && <SanctuaryDetailsView sanctuary={sanctuary} />}
    </Card>
  );
};

export default SanctuaryDetails;
