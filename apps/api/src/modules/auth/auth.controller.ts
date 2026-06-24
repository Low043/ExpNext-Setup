import { type Request, type Response } from 'express';
import { type RegisterInput, type LoginInput } from './auth.schema.js';
import * as authService from './auth.service.js';

export async function register(req: Request, res: Response): Promise<void> {
  const result = await authService.register(req.body as RegisterInput);
  res.status(201).json(result);
}

export async function login(req: Request, res: Response): Promise<void> {
  const result = await authService.login(req.body as LoginInput);
  res.status(200).json(result);
}
