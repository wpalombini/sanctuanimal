import { AddIcon, Card, CardContent, CardHeader, IconButton } from '@sanctuanimal/ui';

import { useResidentNotesStore } from '@/lib/stores';

import { HistoricalNotesAdd } from './historical-notes-add';

export const ResidentDetailsHistoricalNotes = () => {
  const { addHistoricalNote, setAddHistoricalNote } = useResidentNotesStore();

  return (
    <Card elevation={0}>
      <CardHeader
        title="Historical notes"
        action={
          !addHistoricalNote && (
            <IconButton
              aria-label="add note"
              onClick={() => {
                setAddHistoricalNote(true);
              }}
            >
              <AddIcon />
            </IconButton>
          )
        }
      />
      {addHistoricalNote && <HistoricalNotesAdd />}
      <CardContent>
        <span>Historical notes coming soon</span>
      </CardContent>
    </Card>
  );
};
