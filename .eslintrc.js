module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
      project: 'tsconfig.json',
      tsconfigRootDir: __dirname,
      sourceType: 'module',
    },
    plugins: ['@typescript-eslint/eslint-plugin'],
    extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
    root: true,
    env: {
      node: true,
      jest: true,
    },
    ignorePatterns: ['.eslintrc.js', 'tracing.ts'],
    rules: {
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'interface',
          format: ['PascalCase'],
          custom: {
            regex: '^I[A-Z]',
            match: true,
          },
        },
        {
          selector: 'property',
          modifiers: ['private'],
          format: ['camelCase'],
          leadingUnderscore: 'require',
        },
        {
          selector: 'method',
          modifiers: ['private', 'protected', 'public'],
          format: ['camelCase'],
        },
      ],
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/explicit-member-accessibility': [
        'error',
        {
          accessibility: 'explicit',
          overrides: {
            accessors: 'explicit',
            constructors: 'no-public',
            methods: 'explicit',
            properties: 'off',
            parameterProperties: 'explicit',
          },
        },
      ],
      '@typescript-eslint/member-ordering': ['error'],
      'curly': ['error'],
      '@typescript-eslint/no-non-null-assertion': ['off'],
    },
  };
  