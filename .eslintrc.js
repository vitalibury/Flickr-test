module.exports = {
  root: true,
  overrides: [
    {
      files: ['*.ts'],
      parserOptions: {
        project: ['tsconfig.*?.json', 'e2e/tsconfig.json'],
        createDefaultProgram: true,
        tsconfigRootDir: __dirname,
        sourceType: 'module',
      },
      extends: ['plugin:@angular-eslint/recommended'],
      rules: {},
    },
    {
      files: ['*.component.html'],
      extends: ['plugin:@angular-eslint/template/recommended'],
      rules: {
      },
    },
    {
      files: ['*.component.ts'],
      extends: ['plugin:@angular-eslint/template/process-inline-templates'],
    },
  ],
};
