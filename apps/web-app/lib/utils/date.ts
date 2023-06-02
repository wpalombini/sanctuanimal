import dayjs from 'dayjs';

export const DATE_FORMAT = 'DD/MM/YYYY';

export const getFormattedDate = (date?: dayjs.Dayjs | null) => {
  return dayjs(date).format(DATE_FORMAT);
};
