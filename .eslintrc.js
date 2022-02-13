// node_modules/.cache/eslint-loader
module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 11,
    sourceType: "module",
    project: "./tsconfig.json",
  },
  extends: [
    "standard",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  rules: {
    "no-var": "error",
    "@typescript-eslint/consistent-type-definitions": [
      "error",
      "interface"
    ],
    "react/react-in-jsx-scope": "off",
  },
  "settings": {
    "import/resolver": {
      "alias": [
        ["@", "src"]
      ]
    }
  }
};
