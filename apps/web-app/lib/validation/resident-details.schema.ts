import dayjs, { type Dayjs } from 'dayjs';
import { z } from 'zod';

import { DATE_FORMAT } from '../utils';

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

const residentSchema = z.object({
  name: validateString('Name'),
  species: validateString('Species'),
  breed: validateString('Breed'),
  gender: validateString('Gender', true, 1).pipe(
    z.enum(['F', 'M'], {
      errorMap: () => ({ message: 'Invalid gender' }),
    }),
  ),
  bio: validateString('Bio', false, 1000)
    .optional()
    .nullable()
    .transform(value => (value === '' ? null : value)),
});

const idSchema = z.string().uuid('Invalid id');
const dateOfBirthStringSchema = z
  .string()
  .refine(value => dayjs(value, DATE_FORMAT, true).isValid())
  .nullable()
  .optional();

export const clientCreateResidentSchema = residentSchema.extend({
  dateOfBirth: z
    .instanceof(dayjs as unknown as typeof Dayjs, { message: 'Invalid date of birth' })
    .nullable()
    .optional()
    .or(dateOfBirthStringSchema),
});

export const serverCreateResidentSchema = residentSchema.extend({
  dateOfBirth: dateOfBirthStringSchema,
  sanctuaryId: idSchema,
});

export const serverUpdateResidentSchema = serverCreateResidentSchema.extend({
  id: idSchema,
  sanctuaryId: idSchema,
});
