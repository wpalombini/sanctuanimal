import { zodResolver } from '@hookform/resolvers/zod';
import { Button, CardContent, TextField } from '@sanctuanimal/ui';
import { useForm } from 'react-hook-form';
import { TypeOf } from 'zod';

import { useResidentNotesStore } from '@/lib/stores';
import { updateGeneralNotesSchema } from '@/lib/validation/resident-general-notes.schema';

type GeneralNotesForm = TypeOf<typeof updateGeneralNotesSchema>;

type GeneralNotesEditProps = {
  generalNotes: string;
};

export const GeneralNotesEdit = ({ generalNotes }: GeneralNotesEditProps) => {
  const { setEditGeneralNotes } = useResidentNotesStore();

  const noteForm = useForm<GeneralNotesForm>({
    mode: 'onChange',
    resolver: zodResolver(updateGeneralNotesSchema),
  });

  const handleEditNotesCancel = () => {
    noteForm.clearErrors();
    noteForm.reset();
    setEditGeneralNotes?.(false);
  };

  const onSubmitGeneralNotesHandler = (values: GeneralNotesForm) => {
    console.log(values);
  };

  return (
    <form autoComplete="off" onSubmit={noteForm.handleSubmit(onSubmitGeneralNotesHandler)}>
      <CardContent>
        <TextField
          label="Note"
          placeholder="Enter general notes about this resident"
          multiline
          minRows={5}
          {...noteForm.register('generalNotes')}
          defaultValue={generalNotes || ''}
          error={!!noteForm.formState.errors.generalNotes}
          helperText={noteForm.formState.errors.generalNotes?.message || ''}
        />
      </CardContent>
      <CardContent sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          onClick={() => handleEditNotesCancel()}
          color="secondary"
          sx={{ marginRight: '5px' }}
        >
          Cancel
        </Button>
        <Button type="submit">Save</Button>
      </CardContent>
    </form>
  );
};
