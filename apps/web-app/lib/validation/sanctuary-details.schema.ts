import { z } from 'zod';

const validateString = (fieldName: string) =>
  z
    .string({ required_error: `${fieldName} field is required` })
    .trim()
    .min(1, { message: `${fieldName} field is required` })
    .max(100, { message: `${fieldName} field must be less than 100 characters` });

export const sanctuarySchema = z.object({
  contact: validateString('Contact'),
  name: validateString('Name'),
});

const idSchema = z.string().uuid('Invalid id');

export const updateSanctuarySchema = sanctuarySchema.extend({
  id: idSchema,
});
