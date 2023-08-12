import { zodResolver } from '@hookform/resolvers/zod';
import { Button, CardContent, TextField } from '@sanctuanimal/ui';
import { useForm } from 'react-hook-form';
import { TypeOf } from 'zod';

import { trpc } from '@/lib/http/client/trpc';
import { useNotificationStore, useResidentNotesStore } from '@/lib/stores';
import { NotificationError, NotificationSuccess } from '@/lib/types';
import {
  serverUpdateGeneralNotesSchema,
  updateGeneralNotesSchema,
} from '@/lib/validation/resident-general-notes.schema';

type GeneralNotesForm = TypeOf<typeof updateGeneralNotesSchema>;
export type GeneralNotesProps = { residentData: TypeOf<typeof serverUpdateGeneralNotesSchema> };
export const GeneralNotesEdit = ({ residentData }: GeneralNotesProps) => {
  const { setEditGeneralNotes } = useResidentNotesStore();
  const { setNotification } = useNotificationStore();

  const utils = trpc.useContext();

  const { isLoading: updateResidentGeneralNotesIsMutating, mutate: updateGeneralNotes } =
    trpc.updateResidentGeneralNotes.useMutation({
      onSuccess(data, variables) {
        utils.getResidentById.invalidate({ id: variables.id });
        setNotification(NotificationSuccess);
        setEditGeneralNotes(false);
      },
      onError(error) {
        console.error(`onError updateResidentGeneralNotes resident.id: ${residentData?.id}`, error);
        setNotification(NotificationError);
      },
    });

  const noteForm = useForm<GeneralNotesForm>({
    mode: 'onChange',
    resolver: zodResolver(updateGeneralNotesSchema),
  });

  const handleEditNotesCancel = () => {
    noteForm.clearErrors();
    noteForm.reset();
    setEditGeneralNotes?.(false);
  };

  const onSubmitGeneralNotesHandler = (formData: GeneralNotesForm) => {
    updateGeneralNotes({
      ...formData,
      id: residentData.id as string,
    });
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
          defaultValue={residentData?.generalNotes || ''}
          error={!!noteForm.formState.errors.generalNotes}
          helperText={noteForm.formState.errors.generalNotes?.message || ''}
        />
      </CardContent>
      <CardContent sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button onClick={() => handleEditNotesCancel()} color="secondary" sx={{ marginRight: 1 }}>
          Cancel
        </Button>
        <Button type="submit" disabled={updateResidentGeneralNotesIsMutating}>
          Save
        </Button>
      </CardContent>
    </form>
  );
};
