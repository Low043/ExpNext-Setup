import { type z } from 'zod';
import { type NextFunction, type Request, type Response } from 'express';
import { ValidationError } from '../errors/app-error.js';

// Valida o body de requisições com base em um schema Zod
// Mapeia os erros para errors: { field: message } e lança uma ValidationError

export function validate(schema: z.ZodType) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};

      for (const issue of result.error.issues) {
        const field = issue.path.join('.') || '_root';
        fieldErrors[field] = issue.message;
      }

      throw new ValidationError(fieldErrors);
    }

    req.body = result.data;
    next();
  };
}
