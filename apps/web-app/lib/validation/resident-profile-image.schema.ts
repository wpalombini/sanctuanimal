import { z } from 'zod';

const idSchema = z.string().uuid('Invalid id');

export const serverUpdateResidentProfileImageSchema = z.object({
  profileImageVersion: z.number().int().positive(),
  id: idSchema,
  sanctuaryId: idSchema,
});
