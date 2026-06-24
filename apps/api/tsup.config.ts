import { defineConfig } from 'tsup';

// Configurações de build

export default defineConfig({
  entry: ['src/index.ts'],
  splitting: false,
  sourcemap: true,
  clean: true,
  format: ['cjs'],
  target: 'node20',
  platform: 'node',
  outDir: 'dist',
  noExternal: ['@repo/database'],
});
