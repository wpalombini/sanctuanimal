import { zodResolver } from '@hookform/resolvers/zod';
import { Button, CardContent, TextField } from '@sanctuanimal/ui';
import { useForm } from 'react-hook-form';
import { TypeOf } from 'zod';

import { sanctuarySchema } from '@/lib/validation/sanctuary-details.schema';

export type SanctuaryDetailsForm = TypeOf<typeof sanctuarySchema>;

type SanctuaryDetailsEditProps = {
  isMutating: boolean;
  sanctuary?: SanctuaryDetailsForm;
  setEditSanctuary?: (value: boolean) => void;
  upsertSanctuary: (values: SanctuaryDetailsForm) => void;
};

export const SanctuaryDetailsEdit = ({
  isMutating,
  sanctuary,
  setEditSanctuary,
  upsertSanctuary,
}: SanctuaryDetailsEditProps) => {
  const sanctuaryForm = useForm<SanctuaryDetailsForm>({
    mode: 'onChange',
    resolver: zodResolver(sanctuarySchema),
  });

  const onSubmitSanctuaryDetailsHandler = (values: SanctuaryDetailsForm) => {
    upsertSanctuary(values);
  };

  const handleEditSanctuaryCancel = () => {
    sanctuaryForm.clearErrors();
    sanctuaryForm.reset();
    setEditSanctuary?.(false);
  };

  return (
    <form autoComplete="off" onSubmit={sanctuaryForm.handleSubmit(onSubmitSanctuaryDetailsHandler)}>
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
        }}
      >
        <TextField
          label="Name *"
          placeholder="Enter the sanctuary name"
          defaultValue={sanctuary?.name || ''}
          {...sanctuaryForm.register('name')}
          error={!!sanctuaryForm.formState.errors.name}
          helperText={sanctuaryForm.formState.errors.name?.message || ''}
        />
        <TextField
          label="Contact *"
          placeholder="A contact person at the sanctuary"
          defaultValue={sanctuary?.contact || ''}
          {...sanctuaryForm.register('contact')}
          error={!!sanctuaryForm.formState.errors.contact}
          helperText={sanctuaryForm.formState.errors.contact?.message || ''}
        />
      </CardContent>
      <CardContent sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          onClick={() => handleEditSanctuaryCancel()}
          color="secondary"
          sx={{ marginRight: 1 }}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isMutating}>
          Save
        </Button>
      </CardContent>
    </form>
  );
};
