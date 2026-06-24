import { type Request, type Response } from 'express';
import { type UpdateUserInput } from './user.schema.js';
import * as userService from './user.service.js';

export async function findAll(_req: Request, res: Response): Promise<void> {
  const users = await userService.findAll();
  res.status(200).json(users);
}

export async function findById(req: Request, res: Response): Promise<void> {
  const id = String(req.params.id);
  const user = await userService.findById(id);
  res.status(200).json(user);
}

export async function update(req: Request, res: Response): Promise<void> {
  const id = String(req.params.id);
  const user = await userService.update(id, req.body as UpdateUserInput);
  res.status(200).json(user);
}

export async function remove(req: Request, res: Response): Promise<void> {
  const id = String(req.params.id);
  await userService.remove(id);
  res.status(204).send();
}
