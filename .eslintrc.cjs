module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true
  },
  extends: ["@hh.ru/eslint-config", "prettier"],
  overrides: [{
    files: "./src*.{ts,tsx}",
    extends: "@hh.ru/eslint-config/typescript",
  },],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["@hh.ru/import-rules", "react-refresh", "prettier"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      {
        allowConstantExport: true
      },
    ],
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "no-use-before-define": "off",
    "import/extensions": "off",
    "import/no-unresolved": "off",
  },
};