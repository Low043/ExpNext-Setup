import { z } from 'zod';

// Configurações de autenticação (lança erro se .env estiver mal configurado)

const authConfigSchema = z.object({
  jwtSecret: z.string().min(1, 'JWT_SECRET é obrigatório'),
  jwtExpiresIn: z.string().default('1d'),
});

export const authConfig = authConfigSchema.parse({
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN,
});
