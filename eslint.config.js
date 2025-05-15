import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default [
  { ignores: ['dist', 'eslint.config.js','vite.config.js'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      "no-restricted-imports": [
        "error",
        {
          "patterns": ["@mui/*/*/*"]
        }
      ],
      'no-console': 1,
      'no-lonely-if': 1,
      'no-trailing-spaces':1,
      'no-multi-spaces':1,
      'no-multiple-empty-lines':1,
      'space-before-blocks': ['error', 'always'],
      'object-curly-spacing': ['error', 'always'],
      'indent':['warn', 2],
      'semi': ['warn','never'],
      'quotes': ['warn','single'],
      'array-bracket-spacing': 1,
      'no-unexpected-multiline':'warn',
      'keyword-spacing': 1,
      'comma-dangle':1,
      'comma-spacing':1,
      'arrow-spacing':1
    },
  },
]
