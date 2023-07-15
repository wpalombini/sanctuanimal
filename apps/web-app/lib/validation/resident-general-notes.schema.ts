import { z } from 'zod';

const idSchema = z.string().uuid('Invalid id');

const validateString = (fieldName: string) =>
  z
    .string()
    .trim()
    .max(1000, { message: `${fieldName} field must be less than 1000 characters` });

export const updateGeneralNotesSchema = z.object({
  generalNotes: validateString('Note'),
});

export const serverUpdateGeneralNotesSchema = updateGeneralNotesSchema.extend({
  id: idSchema,
});
