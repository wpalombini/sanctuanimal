import { z } from 'zod';

const idSchema = z.string().uuid('Invalid id');

const validateString = (fieldName: string) =>
  z
    .string()
    .trim()
    .max(1000, { message: `${fieldName} field must be less than 1000 characters` });

export const newHistoricalNoteSchema = z.object({
  historicalNote: validateString('Note'),
});

export const serverNewHistoricalNoteSchema = newHistoricalNoteSchema.extend({
  id: idSchema,
});
