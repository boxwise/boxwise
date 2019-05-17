const denyImportPatterns = {
  // rule: don't allow imports of modules
  anyModules: "modules/**",
  // rule: don't allow imports of internal module files
  anyModuleInternals: "modules/*/*/**",
  // rule: don't allow relative imports that go up the tree
  relativeImportsUpAnyLevel: "../**",
  // rule: don't allow relative imports that go up the tree more than one level
  relativeImportsUpMoreThanOneLevel: "../../**"
}

module.exports = {
  "plugins": ["eslint-plugin-import","cypress"],
  "extends": [
    "react-app",
    "airbnb",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "prettier",
    "prettier/@typescript-eslint",
    "plugin:cypress/recommended"
  ],
  "env": {
    "cypress/globals": true,
    "jasmine": true,
  },
  "rules": {
    // before modifying these, https://github.com/airbnb/javascript has
    // a great guide as to why airbnb recommend their presets

    // import/order is disabled here, and re-enabled for .eslintrc-fixonly.js
    // as they can be handled automatically we don't bug anyone about it
    // the rest of auto-formatting is dealth with prettier instead
    "import/order": "off",
    // import/no-named-as-default disabled as it prevents a common pattern of exporting
    // non-connected redux components for testing and then exporting
    // the connected component as the default export
    // see https://github.com/benmosher/eslint-plugin-import/issues/544
    "import/no-named-as-default": "off",
    // these are needed to avoid conflicts with prettier
    // and are not disabled by the prettier extension itself
    "react/jsx-one-expression-per-line": "off",
    "react/jsx-wrap-multilines": "off",
    // we're not consistently using prop types at the moment
    "react/prop-types": "off",
    // these should be turned on ultimately but require significant changes
    "no-shadow": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    // others
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "error",
    // enable support for tsx
    "react/jsx-filename-extension": [1, { "extensions": [".jsx", ".tsx"] }],
    "no-restricted-imports": [ "error",
      {
        "paths": ["react-redux","redux"],
        "patterns": [
          // why: preventing weird hierarchies for files */
          denyImportPatterns.relativeImportsUpMoreThanOneLevel,
          // why: you should use the public 'API' exposed by the module
          denyImportPatterns.anyModuleInternals
        ]
      }
    ]
  },
  "overrides": [
    {
      // allow dependencies in test files to be devDependencies only
      "files": ["src/**/*.test.js","src/setupTests.js","src/reactTestingHelpers.jsx"],
      "rules": {
        "import/no-extraneous-dependencies": ["error", {"devDependencies": true}]
      }
    },
    {
      "files": ["src/components/**"],
      "rules": {
        "no-restricted-imports": [ "error",
          {
            // rule: don't allow use of redux 
            // why: these components should be self-contained
            "paths": ["react-redux","redux"],
            "patterns": [
              // why: these components should be self-contained
              denyImportPatterns.relativeImportsUpAnyLevel,
              // why: these components should be standalone
              denyImportPatterns.anyModules
            ]
          }
        ]
      }
    },
    {
      "files": ["src/modules/*/*"],
      "rules": {
        // import/prefer-default-export disabled in modules
        // as we have a pattern of exporting that we want to keep
        // consistent across all modules even if there is only one
        // component to export
        "import/prefer-default-export": "off"
      }
    },
    // permitted uses of redux, to enforce convention
    {
      "files": ["src/*.{jsx,ts,js,tsx}","src/redux/**","src/modules/*/containers/**","src/modules/*/{components,pages}/**Container.*","src/modules/*/{reducer,actions}.{js,ts}"],
      "rules": {
        "no-restricted-imports": [ 
          "error", 
          {
            // rule: allow use of redux 
            "paths": [],
            "patterns": [
              // copied from global rule, as the whole section gets overwritten
              // why: preventing weird hierarchies for files
              denyImportPatterns.relativeImportsUpMoreThanOneLevel,
              // why: you should use the public 'API' exposed by the module
              denyImportPatterns.anyModuleInternals
            ]
          }
        ]
      }
    }
  ],
  
  "settings": {
    "import/resolver": {
      "node": {
        // we need /src included to resolve absolute paths
        "moduleDirectory": ["node_modules", "src/"]
      }
    }
  }
}