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
