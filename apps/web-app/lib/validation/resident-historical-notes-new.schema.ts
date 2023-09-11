import { z } from 'zod';

const idSchema = z.string().uuid('Invalid residentId');

const validateString = (fieldName: string) =>
  z
    .string()
    .trim()
    .min(1, { message: `${fieldName} field is required` })
    .max(1000, { message: `${fieldName} field must be less than 1000 characters` });

export const newHistoricalNoteSchema = z.object({
  historicalNote: validateString('Note'),
  historicalNoteType: z
    .string()
    .trim()
    .pipe(
      z.enum(['G', 'M'], {
        errorMap: () => ({ message: 'Invalid type' }),
      }),
    ),
});

export const serverNewHistoricalNoteSchema = newHistoricalNoteSchema.extend({
  residentId: idSchema,
  sanctuaryId: idSchema,
});
