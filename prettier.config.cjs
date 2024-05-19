module.exports = {
  arrowParens: 'avoid',
  bracketSpacing: true,
  bracketSameLine: false,
  endOfLine: 'auto',
  experimentalTernaries: false,
  insertPragma: false,
  jsxSingleQuote: false,
  overrides: [
    {
      files: ['.editorconfig', '.npmrc'],
      options: {
        iniSpaceAroundEquals: true,
        parser: 'ini',
      },
    },
    {
      files: ['**/*.ts', '**/*.tsx'],
      options: {
        printWidth: 120,
      },
    },
    {
      files: ['**/*.html', '**/*.htm'],
      options: {
        embeddedLanguageFormatting: 'auto',
        // https://prettier.io/blog/2018/11/07/1.15.0.html#whitespace-sensitive-formatting
        htmlWhitespaceSensitivity: 'css',
        parser: 'html',
        printWidth: 9999,
        singleAttributePerLine: true,
        trailingComma: 'none',
      },
    },
    {
      files: ['LICENSE', '**/*.md'],
      options: {
        embeddedLanguageFormatting: 'auto',
        parser: 'markdown',
        proseWrap: 'preserve',
      },
    },
    {
      files: ['**/*.sh'],
      options: {
        /**
         * parser options
         */
        keepComments: true,
        parser: 'sh',
        /**
         * printer options
         */
        binaryNextLine: true,
        indent: 2,
        minify: false,
      },
    },
  ],
  plugins: ['prettier-plugin-ini', 'prettier-plugin-sh', 'prettier-plugin-sql'],
  printWidth: 80,
  quoteProps: 'as-needed',
  rangeStart: 0,
  rangeEnd: Infinity,
  requirePragma: false,
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'es5',
  useTabs: false,
};
