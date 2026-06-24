import { z } from 'zod';

export const updateUserSchema = z.object({
  name: z
    .string('Nome inválido')
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(30, 'Nome deve ter no máximo 30 caracteres')
    .optional(),
  email: z.email('Email inválido').max(60, 'Email deve ter no máximo 60 caracteres').optional(),
});

export type UpdateUserInput = z.infer<typeof updateUserSchema>;
