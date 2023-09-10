const { resolve } = require("node:path");
const { readdirSync, lstatSync } = require("node:fs");

const project = resolve(process.cwd(), "tsconfig.json");

/*
 * This is a custom ESLint configuration for use with
 * Next.js apps.
 *
 * This config extends the Vercel Engineering Style Guide.
 * For more information, see https://github.com/vercel/style-guide
 *
 */

const getPath = (path) => {
  return readdirSync(resolve(process.cwd(), path))
    .filter(entry => entry.substr(0, 1) !== "." && lstatSync(resolve(process.cwd(), path, entry)).isDirectory())
    .map(entry => resolve(process.cwd(), path, entry))
}

module.exports = {
  extends: [
    "@vercel/style-guide/eslint/node",
    "@vercel/style-guide/eslint/typescript",
    "@vercel/style-guide/eslint/browser",
    "@vercel/style-guide/eslint/react",
    "@vercel/style-guide/eslint/next",
    "eslint-config-turbo",
    "eslint-config-prettier"
  ].map(require.resolve),
  parserOptions: {
    project,
  },
  globals: {
    React: true,
    JSX: true,
  },
  settings: {
    "import/resolver": {
      typescript: {
        project,
      },
    },
  },
  ignorePatterns: ["node_modules/", "dist/"],
  // add rules configurations here
  rules: {
    "import/no-default-export": "off",
    "no-console": ["off", { "allow": ["warn", "error", "info"] }],
    "@typescript-eslint/explicit-function-return-type": "off",
    "eol-last": ["error", "always"],
    "import/no-extraneous-dependencies": ["warn", {
      "packageDir": [
        process.cwd(),
        ...getPath('packages'),
        ...getPath('apps'),
      ]
    }]
  },
};
