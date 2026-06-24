import { errorHandler } from '@shared/middlewares/error-handler.js';
import { authRoutes } from '@modules/auth/auth.routes.js';
import { userRoutes } from '@modules/user/user.routes.js';
import express from 'express';

const app = express();

// Middlewares globais
app.use(express.json());

// Rotas
app.use('/auth', authRoutes);
app.use('/users', userRoutes);

// Health check
app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Error handler (deve ser o último middleware registrado)
app.use(errorHandler);

export { app };
