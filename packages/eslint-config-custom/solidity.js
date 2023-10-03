const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

module.exports = {
  extends: [
    "@vercel/style-guide/eslint/node",
    "eslint-config-prettier",
    "eslint-config-turbo",
  ].map(require.resolve)
    .concat(['plugin:prettier/recommended']),
  parserOptions: {
    project,
  },
  plugins: ["prettier"],
  settings: {
    "import/resolver": {
      typescript: {
        project,
      },
      node: {
        extensions: [".mjs", ".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
  ignorePatterns: ["node_modules/", "dist/"],
  rules: {
    "import/no-default-export": "off",
    "import/no-extraneous-dependencies": "off",
    "import/no-named-as-default": "off",
    "import/no-named-as-default-member": "off",
    "react/function-component-definition": "off",
    "react/button-has-type": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/naming-convention": "off",
    "@typescript-eslint/no-unnecessary-condition": "off",
    "no-console": ["off", { "allow": ["warn", "error", "info"] }],
    "eol-last": ["error", "always"],
    "prefer-named-capture-group": "off",
  }
};
