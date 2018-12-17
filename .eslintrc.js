// .eslintrc.js is prioritised over other eslintrc formats

module.exports = {
    extends: [
        "eslint-config-react-app",
        "plugin:react/recommended",
        "plugin:import/errors",
        "plugin:import/warnings",
        "plugin:promise/recommended",
        "plugin:lodash/recommended",
        "plugin:destructuring/recommended"
    ],
    plugins: ["react", "import", "promise", "prefer-object-spread", "prettier"],
    rules: {
        "jsx-a11y/accessible-emoji": 0,
        "jsx-a11y/alt-text": 0,
        "jsx-a11y/anchor-has-content": 0,
        "jsx-a11y/anchor-is-valid": 0,
        "lodash/prefer-lodash-method": 0,
        "lodash/preferred-alias": 0,
        "lodash/matches-prop-shorthand": 0,
        "lodash/matches-shorthand": 0,
        "lodash/collection-return": 0,
        "lodash/collection-method-value": 0,
        "lodash/prefer-immutable-method": 0,
        "lodash/prefer-lodash-chain": 0,
        "lodash/import-scope": 0,
        "lodash/prefer-noop": 0,
        "lodash/prefer-filter": 0,
        "lodash/prefer-startswith": 0,
        "lodash/prefer-constant": 0,
        "lodash/prefer-includes": "warn",
        "react/prop-types": 0,
        "react/no-string-refs": 0,
        "prettier/prettier": "error",
        "import/no-webpack-loader-syntax": "off",
        "linebreak-style": "off",

        "arrow-parens": "off",
        "object-curly-newline": "off",
        "no-mixed-operators": "off",
        "arrow-body-style": "off",
        "function-paren-newline": "off",
        "no-plusplus": "off",
        "space-before-function-paren": 0,

        "max-len": [0, 140, 2, { ignoreUrls: true }],
        "no-console": "warn",
        "no-alert": "warn",

        "no-param-reassign": "off",
        radix: "off",

        "react/require-default-props": "off",
        "react/forbid-prop-types": "off",


        "react/no-find-dom-node": "off",
        "react/no-did-mount-set-state": "off",
        "react/no-unused-prop-types": "off",
        "react/jsx-one-expression-per-line": "off"

        // "jsx-a11y/label-has-for": [2, {
        //     "required": {
        //         "every": ["id"]
        //     }
        // }], // для ошибки вложенных свойств htmlFor элементов label
    }
};
