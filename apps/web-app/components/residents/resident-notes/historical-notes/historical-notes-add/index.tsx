import { zodResolver } from '@hookform/resolvers/zod';
import { Button, CardContent, TextField } from '@sanctuanimal/ui';
import { useForm } from 'react-hook-form';
import { TypeOf } from 'zod';

import { useResidentNotesStore } from '@/lib/stores';
import { newHistoricalNoteSchema } from '@/lib/validation/resident-historical-notes-new.schema';

type HistoricalNotesForm = TypeOf<typeof newHistoricalNoteSchema>;

export const HistoricalNotesAdd = () => {
  const { setAddHistoricalNote } = useResidentNotesStore();

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
    console.log(formData);
    // updateGeneralNotes({
    //   ...formData,
    //   id: residentData.id as string,
    // });
  };

  return (
    <form autoComplete="off" onSubmit={noteForm.handleSubmit(onSubmitNewHistoricalNoteHandler)}>
      <CardContent>
        <TextField
          label="Note"
          placeholder="Enter a new historical note for this resident"
          multiline
          minRows={5}
          {...noteForm.register('historicalNote')}
          error={!!noteForm.formState.errors.historicalNote}
          helperText={noteForm.formState.errors.historicalNote?.message || ''}
        />
      </CardContent>
      <CardContent sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button onClick={() => handleAddNoteCancel()} color="secondary" sx={{ marginRight: '5px' }}>
          Cancel
        </Button>
        <Button type="submit" disabled={true}>
          Save
        </Button>
      </CardContent>
    </form>
  );
};
