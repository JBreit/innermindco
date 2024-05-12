module.exports = {
  'src/**/*.{cjs,cts,mjs,mts,js,jsx,ts,tsx,vue}': [
    'npm run prettier:format',
    'npm run lint:fix',
  ],
  '*.md': ['npm run mdlint:fix'],
  '.editorconfig': [
    'npx prettier --write .editorconfig --plugin=prettier-plugin-ini',
  ],
  LICENSE: ['npx prettier --write'],
  'package.json': [
    'npx prettier --config prettier.config.cjs ./package.json --write',
    'npm run prettier:package',
  ],
};
