import { Card, CardContent, Typography } from '@sanctuanimal/ui';
import dayjs from 'dayjs';

import { getLabelForHistoricalNoteValue } from '@/lib/utils';

type HistoricalNotesItemProps = {
  createdAt: string;
  historicalNote: string;
  historicalNoteType: string;
  id: string;
};

export const HistoricalNoteItem = ({ note }: { note: HistoricalNotesItemProps }) => {
  return (
    <Card elevation={0} variant="outlined">
      <CardContent>
        <Typography variant="body2" color="GrayText">
          {note.historicalNote}
        </Typography>
      </CardContent>
      <CardContent
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          paddingY: 1,
          '&:last-child': { paddingBottom: 1 },
        }}
      >
        <Typography variant="caption" color="grey">
          Note: {getLabelForHistoricalNoteValue(note.historicalNoteType)}
        </Typography>
        <Typography variant="caption" color="grey">
          Date: {dayjs(note.createdAt).format('DD/MM/YYYY HH:mm')}
        </Typography>
      </CardContent>
    </Card>
  );
};
