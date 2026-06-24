import { type TokenPayload } from './auth.types.js';
import { type RegisterInput, type LoginInput } from './auth.schema.js';
import { hashPassword, comparePassword } from '@shared/utils/hash.js';
import { AppError } from '@shared/errors/app-error.js';
import { authConfig } from './auth.config.js';
import { prisma } from '@repo/database';
import jwt from 'jsonwebtoken';

function generateToken(payload: TokenPayload): string {
  return jwt.sign(payload, authConfig.jwtSecret, {
    expiresIn: authConfig.jwtExpiresIn as jwt.SignOptions['expiresIn'],
  });
}

export async function register(data: RegisterInput) {
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (existingUser) {
    throw new AppError(409, 'Email já cadastrado');
  }

  const hashedPassword = await hashPassword(data.password);

  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashedPassword,
    },
  });

  const token = generateToken({
    sub: user.id,
    email: user.email,
    role: user.role,
  });

  return {
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
    token,
  };
}

export async function login(data: LoginInput) {
  const user = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (!user) {
    throw new AppError(401, 'Credenciais inválidas');
  }

  const isPasswordValid = await comparePassword(data.password, user.password);

  if (!isPasswordValid) {
    throw new AppError(401, 'Credenciais inválidas');
  }

  const token = generateToken({
    sub: user.id,
    email: user.email,
    role: user.role,
  });

  return {
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
    token,
  };
}
