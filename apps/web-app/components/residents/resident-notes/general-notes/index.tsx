import { Card, CardHeader, CreateIcon, IconButton } from '@sanctuanimal/ui';
import { useRouter } from 'next/router';

import { trpc } from '@/lib/http/client/trpc';
import { useResidentNotesStore } from '@/lib/stores';

import { GeneralNotesEdit } from './general-notes-edit';
import { GeneralNotesView } from './general-notes-view';

export const ResidentDetailsGeneralNotes = () => {
  const params = useRouter();
  const { editGeneralNotes, setEditGeneralNotes } = useResidentNotesStore();

  const { data: residentData } = trpc.getResidentById.useQuery(
    { id: params.query.id as string },
    { staleTime: Infinity },
  );

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
      {editGeneralNotes && residentData && (
        <GeneralNotesEdit
          residentData={{
            id: residentData.id as string,
            generalNotes: residentData.generalNotes as string,
          }}
        />
      )}
      {!editGeneralNotes && <GeneralNotesView generalNotes={residentData?.generalNotes} />}
    </Card>
  );
};
