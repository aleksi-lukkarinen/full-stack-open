module.exports = {
  "env": {
    "browser": true,
    "es6": true,
    "jest/globals": true
  },
  "plugins": [
    "react", "jest", "security", "cypress"
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
    "react/boolean-prop-naming": [
      "error",
      { "rule": "^[a-z][A-Za-z0-9]*(Is|Has)[A-Za-z0-9]+$" }
    ],
    "react/button-has-type": "error",
    "react/jsx-closing-bracket-location": ["error", {
      "nonEmpty": "after-props",
      "selfClosing": "after-props"
    }],
    "react/jsx-closing-tag-location": "error",
    "react/jsx-curly-spacing": [2, { "when": "always" }],
    "react/jsx-equals-spacing": [2, "never"],
    "react/jsx-handler-names": ["error", {
      "eventHandlerPrefix": "handle",
      "eventHandlerPropPrefix": "on",
      "checkLocalVariables": false,
      "checkInlineFunction": false
    }],
    "react/jsx-indent-props": ["error", 2],
    "react/jsx-key": ["error"],
    "react/jsx-pascal-case": "error",
    "react/jsx-props-no-multi-spaces": "error",
    "react/jsx-tag-spacing": ["error", {
      "closingSlash": "never",
      "beforeSelfClosing": "always",
      "afterOpening": "never",
      "beforeClosing": "allow"
    }],
    "react/jsx-wrap-multilines": ["error", {
      "declaration": "parens-new-line",
      "assignment": "parens-new-line",
      "return": "parens-new-line",
      "arrow": "parens-new-line",
      "condition": "ignore",
      "logical": "ignore",
      "prop": "ignore"
    }],
    "react/no-typos": "error",
    "react/prefer-es6-class": ["error", "always"],
    "react/prefer-stateless-function": "error",
    "react/prop-types": "off",
    "react/self-closing-comp": "error",
    "semi": ["error", "never"]
  },
  "settings": {
    "react": {
      "version": "detect",
      "createClass": "createReactClass",
      "pragma": "React",
      "fragment": "Fragment"
    },
    "propWrapperFunctions": [],
    "linkComponents": [
      "Hyperlink",
      { "name": "Link", "linkAttribute": "to" }
    ]
  }
}
