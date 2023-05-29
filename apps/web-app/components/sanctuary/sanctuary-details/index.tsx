import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CreateIcon,
  IconButton,
  TextField,
  Typography,
} from '@sanctuanimal/ui';
import { useForm } from 'react-hook-form';
import { TypeOf } from 'zod';

import DisplayField from '@/components/ui/display-field';
import { SanctuariesOutput } from '@/lib/types';
import { upsertSanctuarySchema } from '@/lib/validation/sanctuary-details.schema';

type SanctuaryDetailsForm = TypeOf<typeof upsertSanctuarySchema>;

export type SanctuaryDetailsProps = {
  editSanctuary: boolean;
  isMutating: boolean;
  sanctuaries: SanctuariesOutput | undefined;
  setEditSanctuary: (value: boolean) => void;
  upsertSanctuary: (values: SanctuaryDetailsForm) => void;
};

const SanctuaryDetails = ({
  editSanctuary,
  isMutating,
  sanctuaries,
  setEditSanctuary,
  upsertSanctuary,
}: SanctuaryDetailsProps) => {
  const sanctuaryForm = useForm<SanctuaryDetailsForm>({
    mode: 'onChange',
    resolver: zodResolver(upsertSanctuarySchema),
  });

  const onSubmitSanctuaryDetailsHandler = (values: SanctuaryDetailsForm) => {
    upsertSanctuary(values);
  };

  const handleEditSanctuaryCancel = () => {
    setEditSanctuary(false);
    sanctuaryForm.clearErrors();
    sanctuaryForm.reset();
  };

  return (
    <Card>
      <CardHeader
        title="Sanctuary details"
        action={
          !editSanctuary && (
            <IconButton aria-label="edit sanctuary" onClick={() => setEditSanctuary(true)}>
              <CreateIcon />
            </IconButton>
          )
        }
      />
      {editSanctuary && (
        <form
          autoComplete="off"
          onSubmit={sanctuaryForm.handleSubmit(onSubmitSanctuaryDetailsHandler)}
        >
          <CardContent
            sx={{
              '& .MuiTextField-root:not(:last-child)': { marginBottom: '40px' },
            }}
          >
            <TextField
              label="Name *"
              placeholder="Enter the sanctuary name"
              defaultValue={(sanctuaries && sanctuaries[0]?.name) || ''}
              {...sanctuaryForm.register('name')}
              error={!!sanctuaryForm.formState.errors.name}
              helperText={sanctuaryForm.formState.errors.name?.message || ''}
            />
            <TextField
              label="Contact *"
              placeholder="A contact person at the sanctuary"
              defaultValue={(sanctuaries && sanctuaries[0]?.contact) || ''}
              {...sanctuaryForm.register('contact')}
              error={!!sanctuaryForm.formState.errors.contact}
              helperText={sanctuaryForm.formState.errors.contact?.message || ''}
            />
          </CardContent>
          <CardContent sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              onClick={() => handleEditSanctuaryCancel()}
              color="secondary"
              sx={{ marginRight: '5px' }}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isMutating}>
              Save
            </Button>
          </CardContent>
        </form>
      )}
      {!editSanctuary && (
        <CardContent sx={{ '> section:not(:last-child)': { marginBottom: '20px' } }}>
          {sanctuaries?.length === 0 && (
            <Typography>Click on the pencil icon to start editing this section!</Typography>
          )}
          {!!sanctuaries?.length && (
            <>
              <DisplayField label="Name" value={sanctuaries[0]?.name} />
              <DisplayField label="Contact" value={sanctuaries[0]?.contact} />
            </>
          )}
        </CardContent>
      )}
    </Card>
  );
};

export default SanctuaryDetails;
