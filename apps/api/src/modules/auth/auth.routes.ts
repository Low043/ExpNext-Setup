import { validate } from '@shared/middlewares/validate.js';
import { loginSchema, registerSchema } from './auth.schema.js';
import * as authController from './auth.controller.js';
import { Router } from 'express';

export const authRoutes = Router();

authRoutes.post('/register', validate(registerSchema), authController.register);
authRoutes.post('/login', validate(loginSchema), authController.login);
