import { defineConfig } from 'prisma/config';
import 'dotenv/config';

// Configurações do Prisma CLI (pnpm -F api exec prisma <command>)

const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;
const DB_URL = `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;

export default defineConfig({
  schema: '../../packages/database/prisma/schema.prisma',
  migrations: { path: '../../packages/database/prisma/migrations' },
  datasource: { url: DB_URL },
});
