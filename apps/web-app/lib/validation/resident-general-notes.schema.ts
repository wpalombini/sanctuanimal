import { z } from 'zod';

const validateString = (fieldName: string) =>
  z
    .string({ required_error: `${fieldName} field is required` })
    .trim()
    .min(1, { message: `${fieldName} field is required` })
    .max(1000, { message: `${fieldName} field must be less than 1000 characters` });

export const updateGeneralNotesSchema = z.object({
  generalNotes: validateString('Note'),
});
