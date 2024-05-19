const process = require('node:process');
const { FlatCompat } = require('@eslint/eslintrc');
const js = require('@eslint/js');
const tsParser = require('@typescript-eslint/parser');
const ts = require('@typescript-eslint/eslint-plugin');
const eslintConfigPrettier = require('eslint-config-prettier');
const eslintPluginImport = require('eslint-plugin-import');
const globals = require('globals');

const compat = new FlatCompat({
  baseDirectory: __dirname,
  resolvePluginsRelativeTo: __dirname,
  recommendedConfig: js.configs.recommended,
});

const OFF = 0;
const WARNING = 1;
const ERROR = 2;

module.exports = [
  ...compat.extends(
    'airbnb-base',
    'plugin:import/recommended',
    'plugin:jsx-a11y/recommended',
  ),

  eslintConfigPrettier,

  ...compat.plugins('import', 'jsx-a11y'),

  ...compat.env({
    es2024: true,
    node: true,
  }),
  {
    ignores: [
      'apps/**/dist/*',
      'bin/*',
      'coverage/*',
      'dist/*',
      'docs/*',
      'e2e/*',
      'logs/*',
      'node_modules/*',
      'packages/**/dist/*',
      'scripts/*',
      'temp/*',
      'tests/**/*.spec.{js,ts}',
      '*.config.{cjs,js,mjs,ts}',
      '.docker/*',
      '.github/*',
      '.husky/*',
      '.vscode/*',
      'LICENSE',
      'CHANGELOG.md',
      'TODO.md',
      '/.*',
      '.*',
    ],
  },
  {
    languageOptions: {
      globals: {
        ...globals.es2017,
        ...globals.node,
        it: 'readonly',
        describe: 'readonly',
        expect: 'readonly',
        jest: 'readonly',
        test: 'readonly',
      },
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
  },
  {
    files: ['**/*.{cts,mts,ts,tsx}', '**/*.spec.{cts,mts,ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: {
          experimentalObjectRestSpread: true,
          impliedStrict: true,
          jsx: true,
          modules: true,
        },
        ecmaVersion: 2024,
        emitDecoratorMetadata: true,
        project: [
          `${__dirname}/packages/*/tsconfig.json`,
          `${__dirname}/tsconfig.eslint.json`,
          `${__dirname}/tsconfig.test.json`,
          `${__dirname}/tsconfig.json`,
        ],
        tsconfigRootDir: __dirname,
        warnOnUnsupportedTypeScriptVersion: true,
      },
    },
    plugins: {
      '@typescript-eslint': ts,
      import: eslintPluginImport,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...ts.configs['recommended-type-checked'].rules,
      ...ts.configs['stylistic-type-checked'].rules,

      'constructor-super': OFF,

      'comma-spacing': [
        ERROR,
        {
          before: false,
          after: true,
        },
      ],

      eqeqeq: [ERROR, 'always'],

      'getter-return': OFF,

      'implicit-arrow-linebreak': OFF,

      'import/extensions': [
        ERROR,
        {
          ignorePackages: true,
          cjs: 'never',
          js: 'never',
          json: 'always',
          jsx: 'never',
          mjs: 'never',
          ts: 'never',
          tsx: 'never',
        },
      ],

      'import/no-extraneous-dependencies': [
        ERROR,
        {
          devDependencies: [
            'eslint.config.js',
            'packages/**/src/*.{test,spec}.{cts,mts,ts,tsx}',
            'src/**/*.{test,spec}.{cts,mts,ts,tsx}',
            '**/*.{test,spec}.{cts,mts,ts,tsx}',
          ],
          optionalDependencies: false,
          peerDependencies: true,
          // bundleDependencies: true,
          packageDir: [
            `${__dirname}/packages/utils`,
          ],
        },
      ],

      'import/named': OFF,
      'import/namespace': OFF,

      'import/no-named-as-default': OFF,
      'import/no-named-as-default-member': OFF,

      'import/no-unresolved': ERROR,

      'import/order': [
        ERROR,
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'unknown',
            'parent',
            'sibling',
            'index',
            'object',
            'type',
          ],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc', // asc | desc | ignore
            orderImportKind: 'asc', // asc | desc | ignore
            caseInsensitive: true,
          },
        },
      ],

      'import/prefer-default-export': OFF,

      indent: [
        ERROR,
        2,
        {
          SwitchCase: WARNING,
        },
      ],

      'jsx-quotes': [ERROR, 'prefer-single'],

      'linebreak-style': [
        ERROR,
        process.platform !== 'win32' ? 'linux' : 'windows',
      ],

      'no-alert': process.env.NODE_ENV === 'production' ? ERROR : OFF,
      'no-console': process.env.NODE_ENV === 'production' ? ERROR : OFF,
      'no-const-assign': OFF,
      'no-debugger': process.env.NODE_ENV === 'production' ? ERROR : OFF,
      'no-dupe-args': OFF,
      'no-dupe-class-members': OFF,
      'no-dupe-keys': OFF,
      'no-dynamic-require': OFF,
      'no-func-assign': OFF,
      'no-implied-eval': OFF,
      'no-import-assign': OFF,
      'no-new-symbol': OFF,
      'no-obj-calls': OFF,
      'no-redeclare': OFF,
      'no-restricted-globals': OFF,
      'no-setter-return': OFF,
      'no-this-before-super': OFF,
      'no-undef': OFF,

      'no-underscore-dangle': [
        ERROR,
        {
          allow: ['__WB_MANIFEST'],
        },
      ],

      'no-unreachable': OFF,
      'no-unsafe-negation': OFF,

      'no-unused-expressions': [
        ERROR,
        {
          allowShortCircuit: true,
          allowTernary: true,
          allowTaggedTemplates: true,
        },
      ],

      'no-unused-private-class-members': ERROR,

      'no-use-before-define': [
        ERROR,
        {
          functions: false,
        },
      ],

      'operator-linebreak': [ERROR, 'before'],

      semi: [ERROR, 'always'],

      'space-before-function-paren': [
        ERROR,
        {
          anonymous: 'always',
          named: 'never',
          asyncArrow: 'always',
        },
      ],

      'space-in-parens': [ERROR, 'never'],

      'valid-typeof': OFF,

      /**
       * TypeScript-ESLint
       */
      '@typescript-eslint/ban-types': OFF,
      '@typescript-eslint/ban-ts-ignore': OFF,
      '@typescript-eslint/ban-ts-comment': [
        ERROR,
        {
          'ts-ignore': false,
        },
      ],

      'comma-dangle': OFF,
      '@typescript-eslint/comma-dangle': OFF,

      '@typescript-eslint/consistent-type-exports': [
        ERROR,
        {
          fixMixedExportsWithInlineTypeSpecifier: false,
        },
      ],

      indent: OFF,
      '@typescript-eslint/indent': OFF,

      'no-unused-vars': OFF,
      '@typescript-eslint/no-unused-vars': [
        ERROR,
        {
          args: 'after-used',
          argsIgnorePattern: '(^reject$|^_$)',
          vars: 'all',
          varsIgnorePattern: '(^_$|^h$)',
        },
      ],

      '@typescript-eslint/prefer-nullish-coalescing': ERROR,
    },
  },
  {
    settings: {
      'import/extensions': [
        '.{cjs,js,jsx,mjs}',
        '.{cts,mts,ts,tsx}',
        '*.d.{cts,mts,ts}',
        '.json',
        '.node',
      ],
      'import/parser': {
        '@typescript-eslint/parser': ['.cts', '.mts', '.ts', '.tsx'],
      },
      'import/resolver': {
        node: {
          extensions: [
            '.{cjs,js,jsx,mjs}',
            '.{cts,mts,ts,tsx}',
            '*.d.{cts,mts,ts}',
            '.json',
            '.node',
          ],
          moduleDirectory: [
            `${__dirname}/apps/*`,
            `${__dirname}/packages/*`,
            `${__dirname}/node_modules`,
          ],
        },
        typescript: {
          alwaysTryTypes: true,
        },
      },
    },
  },
];
