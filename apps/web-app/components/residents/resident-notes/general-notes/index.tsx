import { Card, CardHeader, CreateIcon, IconButton } from '@sanctuanimal/ui';

import { useResidentNotesStore } from '@/lib/stores';

import { GeneralNotesEdit } from './general-notes-edit';
import { GeneralNotesView } from './general-notes-view';

export const ResidentDetailsGeneralNotes = ({ generalNotes }: { generalNotes: string }) => {
  const { editGeneralNotes, setEditGeneralNotes } = useResidentNotesStore();

  return (
    <Card elevation={0}>
      <CardHeader
        title="General notes"
        action={
          !editGeneralNotes && (
            <IconButton aria-label="edit general notes" onClick={() => setEditGeneralNotes?.(true)}>
              <CreateIcon />
            </IconButton>
          )
        }
      />
      {editGeneralNotes && <GeneralNotesEdit generalNotes={generalNotes} />}
      {!editGeneralNotes && <GeneralNotesView generalNotes={generalNotes} />}
    </Card>
  );
};
