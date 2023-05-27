import dayjs from 'dayjs';
import { z } from 'zod';

const validateString = (fieldName: string, isRequired = true, maxChars = 50) => {
  let validation;

  if (isRequired) {
    validation = z
      .string({ required_error: `${fieldName} field is required` })
      .trim()
      .min(1, { message: `${fieldName} field is required` })
      .max(maxChars, {
        message: `${fieldName} field must be equal or less than ${maxChars} characters`,
      });
  } else {
    validation = z.string().trim();
  }
  return validation.max(maxChars, {
    message: `${fieldName} field must be less than ${maxChars} characters`,
  });
};

const validateDate = (fieldName: string) =>
  z
    .any()
    .transform(value => {
      return dayjs(value).format();
    })
    .pipe(
      z
        .string()
        .trim()
        .datetime({ message: `Invalid ${fieldName}`, offset: true }),
    );

export const upsertResidentSchema = z.object({
  name: validateString('Name'),
  species: validateString('Species'),
  breed: validateString('Breed'),
  dateOfBirth: validateDate('Date of birth').nullable().optional(),
  gender: validateString('Gender', true, 1).pipe(
    z.enum(['F', 'M'], {
      errorMap: () => ({ message: 'Invalid gender' }),
    }),
  ),
  bio: validateString('Bio', false, 1000)
    .optional()
    .transform(value => (value === '' ? undefined : value)),
});
