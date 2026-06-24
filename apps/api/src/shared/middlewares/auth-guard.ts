import { type NextFunction, type Request, type Response } from 'express';
import { type TokenPayload } from '@modules/auth/auth.types.js';
import { authConfig } from '@modules/auth/auth.config.js';
import { AppError } from '../errors/app-error.js';
import jwt from 'jsonwebtoken';

// Valida o JWT da requisição e adiciona o payload ao Request

export function authGuard(req: Request, _res: Response, next: NextFunction): void {
  const header = req.headers.authorization;

  if (!header?.startsWith('Bearer ')) {
    throw new AppError(401, 'Token não fornecido');
  }

  const token = header.slice(7);

  try {
    const decoded = jwt.verify(token, authConfig.jwtSecret) as TokenPayload;
    req.user = decoded;
    next();
  } catch {
    throw new AppError(401, 'Token inválido ou expirado');
  }
}
