import { type UpdateUserInput } from './user.schema.js';
import { AppError } from '@shared/errors/app-error.js';
import { prisma } from '@repo/database';

const userSelect = {
  id: true,
  name: true,
  email: true,
  role: true,
  createdAt: true,
};

export async function findAll() {
  return prisma.user.findMany({ select: userSelect });
}

export async function findById(id: string) {
  const user = await prisma.user.findUnique({
    where: { id },
    select: userSelect,
  });

  if (!user) {
    throw new AppError(404, 'Usuário não encontrado');
  }

  return user;
}

export async function update(id: string, data: UpdateUserInput) {
  await findById(id); // garante que existe

  return prisma.user.update({
    where: { id },
    data,
    select: userSelect,
  });
}

export async function remove(id: string) {
  await findById(id);
  await prisma.user.delete({ where: { id } });
}
