import { zodResolver } from '@hookform/resolvers/zod';
import { Button, CardContent, MenuItem, TextField } from '@sanctuanimal/ui';
import { useRouter } from 'next/router';
import { Controller, useForm } from 'react-hook-form';
import { TypeOf } from 'zod';

import { trpc } from '@/lib/http/client/trpc';
import { useNotificationStore, useResidentNotesStore } from '@/lib/stores';
import { NotificationError, NotificationSuccess } from '@/lib/types';
import { getLabelForHistoricalNoteValue } from '@/lib/utils';
import { newHistoricalNoteSchema } from '@/lib/validation/resident-historical-notes-new.schema';

type HistoricalNotesForm = TypeOf<typeof newHistoricalNoteSchema>;

export const HistoricalNotesAdd = () => {
  const params = useRouter();
  const residentId = params.query.id as string;

  const { setAddHistoricalNote } = useResidentNotesStore();
  const { setNotification } = useNotificationStore();

  const utils = trpc.useContext();

  const {
    isLoading: createResidentHistoricalNoteIsMutating,
    mutate: createResidentHistoricalNote,
  } = trpc.createResidentHistoricalNote.useMutation({
    onSuccess(data, variables) {
      utils.getResidentHistoricalNotes.invalidate({ residentId: variables.residentId });
      setNotification(NotificationSuccess);
      setAddHistoricalNote(false);
    },
    onError(error) {
      console.error(`onError createResidentHistoricalNote for resident.id: ${residentId}`, error);
      setNotification(NotificationError);
    },
  });

  const noteForm = useForm<HistoricalNotesForm>({
    mode: 'onChange',
    resolver: zodResolver(newHistoricalNoteSchema),
  });

  const handleAddNoteCancel = () => {
    noteForm.clearErrors();
    noteForm.reset();
    setAddHistoricalNote?.(false);
  };

  const onSubmitNewHistoricalNoteHandler = (formData: HistoricalNotesForm) => {
    createResidentHistoricalNote({
      ...formData,
      residentId,
    });
  };

  return (
    <form autoComplete="off" onSubmit={noteForm.handleSubmit(onSubmitNewHistoricalNoteHandler)}>
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '40px',
        }}
      >
        <TextField
          label="Note *"
          placeholder="Enter a new historical note for this resident"
          multiline
          minRows={5}
          {...noteForm.register('historicalNote')}
          error={!!noteForm.formState.errors.historicalNote}
          helperText={noteForm.formState.errors.historicalNote?.message || ''}
        />
        <Controller
          name="historicalNoteType"
          control={noteForm.control}
          defaultValue={'G'}
          render={({ field }) => (
            <TextField
              {...field}
              id="historicalNoteType"
              select
              label="Type *"
              defaultValue={'G'}
              error={!!noteForm.formState.errors.historicalNoteType}
              helperText={noteForm.formState.errors.historicalNoteType?.message || ''}
            >
              <MenuItem value="G">{getLabelForHistoricalNoteValue('G')}</MenuItem>
              <MenuItem value="M">{getLabelForHistoricalNoteValue('M')}</MenuItem>
            </TextField>
          )}
        />
      </CardContent>
      <CardContent sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button onClick={() => handleAddNoteCancel()} color="secondary" sx={{ marginRight: '5px' }}>
          Cancel
        </Button>
        <Button type="submit" disabled={createResidentHistoricalNoteIsMutating}>
          Save
        </Button>
      </CardContent>
    </form>
  );
};
