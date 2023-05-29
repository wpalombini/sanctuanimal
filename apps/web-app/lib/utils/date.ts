import dayjs from 'dayjs';

export const getFormattedDate = (date?: string | number | Date | dayjs.Dayjs | null) => {
  return dayjs(date).format('DD/MM/YYYY');
};
