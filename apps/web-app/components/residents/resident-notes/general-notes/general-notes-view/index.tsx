import { CardContent } from '@sanctuanimal/ui';

export const GeneralNotesView = ({ generalNotes }: { generalNotes: string }) => {
  return <CardContent>{generalNotes}</CardContent>;
};
