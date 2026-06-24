import { z } from 'zod';

export const registerSchema = z.object({
  name: z
    .string('Nome inválido')
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(30, 'Nome deve ter no máximo 30 caracteres'),
  email: z.email('Email inválido').max(60, 'Email deve ter no máximo 60 caracteres'),
  password: z.string('Senha inválida').min(8, 'Senha deve ter pelo menos 8 caracteres'),
});

export const loginSchema = registerSchema.omit({ name: true });

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
