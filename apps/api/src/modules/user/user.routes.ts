import { authGuard } from '@shared/middlewares/auth-guard.js';
import { validate } from '@shared/middlewares/validate.js';
import { access } from '@shared/middlewares/access.js';
import { updateUserSchema } from './user.schema.js';
import * as userController from './user.controller.js';
import { Router } from 'express';

export const userRoutes = Router();
userRoutes.use(authGuard);

userRoutes.get('/', access('ADMIN'), userController.findAll);
userRoutes.get('/:id', userController.findById);
userRoutes.patch('/:id', validate(updateUserSchema), userController.update);
userRoutes.delete('/:id', access('ADMIN'), userController.remove);
