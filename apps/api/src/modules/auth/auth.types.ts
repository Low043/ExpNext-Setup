import { type Role } from '@repo/database';

export interface TokenPayload {
  sub: string; // userId
  email: string;
  role: Role;
}
