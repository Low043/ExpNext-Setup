import { type TokenPayload } from '@modules/auth/auth.types.js';

// Estende a tipagem padrão do Express (para que o TS reconheça request.user)
// auth-guard adiciona payload do jwt à request.user para users autenticados

declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}
