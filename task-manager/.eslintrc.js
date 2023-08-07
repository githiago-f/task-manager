module.exports = {
  "env": {
    "es2021": true,
    "node": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "plugins": [
    "@typescript-eslint",
    "jest"
  ],
  "ignorePatterns": ["dist", "*.js"],
  "rules": {
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "semi": ["error", "always"],
    "comma-dangle": ["error", "always-multiline"],
    "quotes": ["error", "single"],
    "indent": ["error", 2],
    "dot-notation": "error",
    "eqeqeq": "error",
    "no-return-await": "error",
    "eol-last": ["error", "always"],
    "newline-per-chained-call": ["error", { "ignoreChainWithDepth": 2 }],
    "no-mixed-spaces-and-tabs": "error",
    "object-curly-newline": ["error", { "multiline": true }],
    "no-unused-vars": "off",
    "import/no-cycle": "off",
    "no-param-reassign": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_",
        "caughtErrorsIgnorePattern": "^_"
      }
    ],
    "jest/expect-expect": [
      "error",
      {
        "assertFunctionNames": [
          "expect",
          "request.**.expect",
          "sut.**.expect"
        ]
      }
    ]
  }
};
