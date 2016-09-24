/*eslint no-ignore*/

const OFF = 0;
const WARNING = 1;
const ERROR = 2;

module.exports = {
  parser: 'babel-eslint',
  root: true,

  plugins: [
    'react',
    'immutable'
  ],

  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    },
  },

  env: {
    browser: true,
    es6: true,
    node: true
  },

  extends: ["eslint:recommended", "plugin:react/recommended"],

  rules: {
    "array-bracket-spacing": [ERROR, "never"],
    "brace-style": [ERROR, "1tbs", { "allowSingleLine": true }],
    "consistent-return": ERROR,
    "eol-last": ERROR,
    "indent": [ERROR, 2, { "SwitchCase": 1 }],
    "key-spacing": [2, { "beforeColon": false }],
    "keyword-spacing": ERROR,
    "no-else-return": ERROR,
    "no-native-reassign": ERROR,
    "no-nested-ternary": ERROR,
    "no-spaced-func": ERROR,
    "no-trailing-spaces": ERROR,
    "no-unneeded-ternary": ERROR,
    "no-var": ERROR,
    "no-warning-comments": WARNING,
    "object-curly-spacing": [ERROR, "always"],
    "object-shorthand": ERROR,
    "padded-blocks": [ERROR, "never"],
    "prefer-const": ERROR,
    "prefer-template": ERROR,
    "semi": ERROR,
    "strict": [ERROR, "never"],
    "space-before-blocks": ERROR,
    "space-before-function-paren": [ERROR, { "anonymous": "always", "named": "never" }],
    "space-infix-ops": ERROR,
    "space-unary-ops": [ERROR, { "words": true, "nonwords": false }],

    "no-param-reassign": [ERROR, { "props": true }],
    "no-undef": ERROR,
    //"immutable/no-mutation": ERROR,

    "jsx-quotes": ERROR,
    "react/display-name": ERROR,
    "react/forbid-prop-types": ERROR,
    "react/jsx-boolean-value": WARNING,
    "react/jsx-closing-bracket-location": ERROR,
    "react/jsx-curly-spacing": ERROR,
    "react/jsx-equals-spacing": ERROR,
    "react/jsx-first-prop-new-line": [ERROR, "multiline"],
    "react/jsx-indent": [ERROR, 2],
    "react/jsx-indent-props": [ERROR, 2],
    "react/jsx-key": WARNING,
    "react/jsx-no-bind": [ERROR, { "ignoreRefs": true }],
    "react/jsx-no-duplicate-props": WARNING,
    "react/jsx-no-undef": WARNING,
    "react/jsx-pascal-case": WARNING,
    "react/jsx-sort-props": [WARNING, { "callbacksLast": true }],
    "react/jsx-uses-react": WARNING,
    "react/jsx-uses-vars": WARNING,
    "react/no-danger": ERROR,
    "react/no-deprecated": WARNING,
    "react/no-did-mount-set-state": WARNING,
    "react/no-did-update-set-state": WARNING,
    "react/no-direct-mutation-state": ERROR,
    "react/no-is-mounted": WARNING,
    "react/no-multi-comp": OFF,
    "react/no-set-state": WARNING,
    "react/no-string-refs": ERROR,
    "react/no-unknown-property": WARNING,
    "react/prefer-es6-class": WARNING,
    "react/prefer-stateless-function": WARNING,
    "react/prop-types": WARNING,
    "react/react-in-jsx-scope": WARNING,
    "react/require-extension": WARNING,
    "react/self-closing-comp": ERROR,
    "react/sort-comp": ERROR,
    "react/sort-prop-types": ERROR,
    "react/wrap-multilines": ERROR
  }
};
