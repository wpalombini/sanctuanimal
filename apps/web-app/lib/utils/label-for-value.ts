export const getLabelForGenderValue = (value?: string) => {
  switch (value) {
    case 'F':
      return 'Female';
    case 'M':
      return 'Male';
    default:
      return '';
  }
};

export const getLabelForHistoricalNoteValue = (value?: string) => {
  switch (value) {
    case 'G':
      return 'General';
    case 'M':
      return 'Medical';
    default:
      return '';
  }
};
