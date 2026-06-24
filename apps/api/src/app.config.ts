import { z } from 'zod';

// Configurações da aplicação (lança erro se .env estiver mal configurado)

const appConfigSchema = z.object({
  port: z.coerce.number('PORT env var invalid'),
  nodeEnv: z.enum(['development', 'production', 'test'], 'NODE_ENV env var invalid'),
});

export const appConfig = appConfigSchema.parse({
  port: process.env.PORT,
  nodeEnv: process.env.NODE_ENV,
});
