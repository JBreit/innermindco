# innermindco.com

[![Node Version][node]][node-url]
[![NPM Version][npm]][npm-url]
[![MIT License][license]][license-url]
[![Code Style: Prettier][prettier]][prettier-url]
[![Commitizen Friendly][commitizen]][commitizen-url]

### ESLint

#### Why is `import/no-unresolved` disabled?

Two reasons:

1. It requires additional configuration, which may be different for monorepo's,
   webpack usage, etc.
2. The rule offers little value in a TypeScript world, as the TypeScript compiler
   will catch these errors.

If you would like to enable this rule, then:

- Enable the rule within your config: `'import/no-unresolved': 'error'`
- Install and configure the TypeScript import resolver: [eslint-import-resolver-typescript](https://www.npmjs.com/package/eslint-import-resolver-typescript)

### NPM Package Mangement

###### Install package dependency

```bash
# Initialize Package
npm init --scope @innermindco --workspace ./packages/<package_name>

# Build package
npm run build --workspace ./packages/<package_name>

# Install Internal Packages
npm install @innermindco/server ./packages/<package_name> --save

# Install External Package
npm install package_name --workspace ./packages/server --save

# Install Internal Package to root ./src
npm install @innermindco/server @innermindco/<package_name> --save

# building the monorepo and all its packages
npm run build

# running the compiled index.js
node dist/main.js
```

```js
[{
  ignores: (await fs.readFile("./.eslintignore", "utf8"))
    .split("\n")
    .filter((pattern) => pattern && !pattern.startsWith("#")),
}]
```

[npm]: https://img.shields.io/npm/v/npm
[npm-url]: https://www.npmjs.com/
[node]: https://img.shields.io/badge/node-%3E%3D21.1.0-blue
[node-url]: https://nodejs.org
[license-url]: LICENSE
[license]: http://img.shields.io/badge/license-MIT-000000.svg?style=flat-square
[prettier-url]: https://github.com/prettier/prettier
[prettier]: https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square
[commitizen-url]: http://commitizen.github.io/cz-cli/
[commitizen]: https://img.shields.io/badge/commitizen-friendly-brightgreen.svg
