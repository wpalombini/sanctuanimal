import { CardContent, Typography } from '@sanctuanimal/ui';

export const GeneralNotesView = ({ generalNotes }: { generalNotes?: string | null }) => {
  return (
    <CardContent>
      {generalNotes ? (
        generalNotes
      ) : (
        <Typography>Click on the pencil icon to start editing this section!</Typography>
      )}
    </CardContent>
  );
};
