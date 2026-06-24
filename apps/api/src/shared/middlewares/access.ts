import { type Role } from '@repo/database';
import { type NextFunction, type Request, type Response } from 'express';
import { AppError } from '../errors/app-error.js';

// Verifica se o usuário logado tem permissão para acessar a rota

export function access(...roles: Role[]) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const userRole = req.user?.role;

    if (!userRole || !roles.includes(userRole)) {
      throw new AppError(403, 'Acesso negado');
    }

    next();
  };
}
