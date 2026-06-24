import { type NextFunction, type Request, type Response } from 'express';
import { AppError, ValidationError } from '../errors/app-error.js';

// Impede a aplicação de quebrar quando um erro não é tratado
// Converte AppError e ValidationError em respostas HTTP para o cliente

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction): void {
  if (err instanceof ValidationError) {
    res.status(err.statusCode).json({
      status: 'error',
      errors: err.errors,
    });
    return;
  }

  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
    return;
  }

  console.error('[UNEXPECTED ERROR]', err);

  res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
}
