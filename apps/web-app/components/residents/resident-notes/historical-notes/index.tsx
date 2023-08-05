import { AddIcon, Box, Card, CardContent, CardHeader, IconButton, Spinner } from '@sanctuanimal/ui';
import { useRouter } from 'next/router';

import { trpc } from '@/lib/http/client/trpc';
import { useResidentNotesStore } from '@/lib/stores';

import { HistoricalNotesAdd } from './historical-notes-add';

export const ResidentDetailsHistoricalNotes = () => {
  const params = useRouter();
  const { addHistoricalNote, setAddHistoricalNote } = useResidentNotesStore();

  const { data: residentHistoricalNotes, isLoading: residentHistoricalNotesIsLoading } =
    trpc.getResidentHistoricalNotes.useQuery(
      { residentId: params.query.id as string },
      { staleTime: Infinity },
    );

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
        {residentHistoricalNotesIsLoading && (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Spinner />
          </Box>
        )}
        {!residentHistoricalNotesIsLoading &&
          (residentHistoricalNotes?.length ? (
            residentHistoricalNotes.map(note => <div key={note.id}>{note.historicalNote}</div>)
          ) : (
            <span>Click on the plus icon to add your first historical note!</span>
          ))}
      </CardContent>
    </Card>
  );
};
