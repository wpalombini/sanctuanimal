import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  DatePicker,
  InputBase,
  MenuItem,
  TextField,
} from '@sanctuanimal/ui';
import dayjs from 'dayjs';
import { Controller, useForm } from 'react-hook-form';
import { TypeOf } from 'zod';

import DatePickerContainer, { DatePickerActionBar } from '@/components/ui/date-picker-container';
import { getLabelForGenderValue } from '@/lib/utils';
import { upsertResidentSchema } from '@/lib/validation/resident-details.schema';

type ResidentDetailsForm = TypeOf<typeof upsertResidentSchema>;

export type ResidentDetailsProps = {
  // editResident: boolean;
  isMutating: boolean;
  // setEditResident: (value: boolean) => void;
  // upsertResident: (values: ResidentDetailsForm) => void;
};

const ResidentDetails = ({ isMutating }: ResidentDetailsProps) => {
  const residentForm = useForm<ResidentDetailsForm>({
    mode: 'onChange',
    resolver: zodResolver(upsertResidentSchema),
  });

  const onSubmitResidentDetailsHandler = (values: ResidentDetailsForm) => {
    console.log(values.dateOfBirth);
    console.log({
      ...values,
      dateOfBirth: values.dateOfBirth ? dayjs(values.dateOfBirth).format() : undefined,
    });
  };

  const handleEditResidentCancel = () => {
    residentForm.clearErrors();
    residentForm.reset();
  };

  return (
    <Card>
      <CardHeader title="Resident details" />
      <form onSubmit={residentForm.handleSubmit(onSubmitResidentDetailsHandler)}>
        <CardContent
          sx={{
            '& .MuiTextField-root:not(:last-child), .MuiFormControl-root': {
              marginBottom: '40px',
            },
          }}
        >
          <TextField
            label="Name *"
            placeholder="Enter the resident name"
            {...residentForm.register('name')}
            error={!!residentForm.formState.errors.name}
            helperText={residentForm.formState.errors.name?.message || ''}
          />
          <TextField
            label="Species *"
            placeholder="Enter the resident species"
            {...residentForm.register('species')}
            error={!!residentForm.formState.errors.species}
            helperText={residentForm.formState.errors.species?.message || ''}
          />
          <TextField
            label="Breed *"
            placeholder="Enter the resident breed"
            {...residentForm.register('breed')}
            error={!!residentForm.formState.errors.breed}
            helperText={residentForm.formState.errors.breed?.message || ''}
          />
          <Controller
            name="gender"
            control={residentForm.control}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                id="gender"
                select
                label="Gender *"
                defaultValue=""
                error={!!residentForm.formState.errors.gender}
                helperText={residentForm.formState.errors.gender?.message || ''}
                SelectProps={{
                  displayEmpty: true,
                  defaultValue: '',
                  renderValue: (value: unknown) => {
                    const strValue = value as string;
                    if (!strValue || strValue.length === 0) {
                      return (
                        <InputBase
                          placeholder="Enter the resident gender"
                          sx={{ '& input': { padding: 0 } }}
                        />
                      );
                    } else {
                      return <>{getLabelForGenderValue(strValue)}</>;
                    }
                  },
                }}
              >
                <MenuItem value="F">{getLabelForGenderValue('F')}</MenuItem>
                <MenuItem value="M">{getLabelForGenderValue('M')}</MenuItem>
              </TextField>
            )}
          />
          <Controller
            name="dateOfBirth"
            control={residentForm.control}
            defaultValue={null}
            render={({ field }) => (
              <DatePickerContainer>
                <DatePicker
                  {...field}
                  disableFuture
                  label="DOB"
                  onChange={field.onChange}
                  slots={{
                    actionBar: DatePickerActionBar,
                  }}
                  slotProps={{
                    textField: {
                      error: !!residentForm.formState.errors.dateOfBirth,
                      helperText: (residentForm.formState.errors.dateOfBirth?.message ||
                        '') as string,
                      placeholder: 'Enter the resident date of birth',
                    },
                  }}
                />
              </DatePickerContainer>
            )}
          />
          <TextField
            label="Bio"
            placeholder="Enter the resident bio"
            multiline
            minRows={2}
            {...residentForm.register('bio')}
            error={!!residentForm.formState.errors.bio}
            helperText={residentForm.formState.errors.bio?.message || ''}
          />
        </CardContent>
        <CardContent sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            onClick={() => handleEditResidentCancel()}
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
    </Card>
  );
};

export default ResidentDetails;
