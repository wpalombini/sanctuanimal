import { Typography } from '@sanctuanimal/ui';

export type DisplayFieldProps = {
  label: string;
  value?: string;
};

const DisplayField = ({ label, value }: DisplayFieldProps) => {
  return (
    <div>
      <Typography variant="subtitle1">{label}:</Typography>
      <Typography variant="h6" gutterBottom>
        {value}
      </Typography>
    </div>
  );
};

export default DisplayField;
