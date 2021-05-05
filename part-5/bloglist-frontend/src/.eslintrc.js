module.exports = {
  "env": {
    "browser": true,
    "es6": true,
    "jest/globals": true
  },
  "plugins": [
    "react", "jest", "security"
  ],
  "extends": [
    "react-app",
    "react-app/jest",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:security/recommended"
  ],
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "rules": {
    "arrow-spacing": [
      "error", { "before": true, "after": true }
    ],
    "brace-style": ["error", "stroustrup"],
    "capitalized-comments": "error",
    "comma-style": ["error", "last"],
    "default-case-last": "error",
    "default-param-last": "error",
    "eqeqeq": "error",
    "indent": ["error", 2, {
      "FunctionDeclaration": {
        "parameters": 3
      },
      "FunctionExpression": {
        "parameters": 3
      },
      "MemberExpression": 2,
      "ObjectExpression": 1,
      "SwitchCase": 1,
      "offsetTernaryExpressions": true
    }],
    "jsx-quotes": ["error", "prefer-double"],
    "linebreak-style": ["error", "windows"],
    "max-len": ["error", { "code": 120 }],
    "no-alert": "error",
    "no-console": "off",
    "no-multi-assign": "error",
    "no-new": "error",
    "no-new-func": "error",
    "no-new-wrappers": "error",
    "no-self-compare": "error",
    "no-shadow": "error",
    "no-tabs": "error",
    "no-trailing-spaces": "error",
    "no-var": "error",
    "object-curly-spacing": ["error", "always"],
    "quotes": ["error", "double"],
    "prefer-arrow-callback": "error",
    "prefer-const": "error",
    "prefer-destructuring": [
      "error", {
        "array": true,
        "object": true
      }, {
        "enforceForRenamedProperties": false
      }
    ],
    "prefer-spread": "error",
    "react/prop-types": "off",
    "semi": ["error", "never"]
  },
  "settings": {
    "react": {
      "version": "detect"
    }
  }
}
