import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import tselint from 'typescript-eslint';
import eslint from '@eslint/js';
import globals from 'globals';

// Configurações do Linter (inclui Prettier via plugin)

export default tselint.config(
  { ignores: ['node_modules', 'dist', 'eslint.config.mjs', 'prisma.config.js', 'tsup.config.ts'] },
  eslint.configs.recommended,
  ...tselint.configs.recommendedTypeChecked,
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
);
