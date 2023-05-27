import 'dayjs/locale/en-au';

import {
  AdapterDayjs,
  Button,
  DialogActions,
  LocalizationProvider,
  PickersActionBarProps,
} from '@sanctuanimal/ui';
import React from 'react';

export const DatePickerActionBar = (props: PickersActionBarProps) => {
  return (
    <DialogActions className={props.className}>
      <Button onClick={props.onClear}>Clear</Button>
      <Button onClick={props.onCancel} color="secondary">
        Cancel
      </Button>
      <Button onClick={props.onAccept}>OK</Button>
    </DialogActions>
  );
};

const DatePickerContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-au">
      {children}
    </LocalizationProvider>
  );
};

export default DatePickerContainer;
