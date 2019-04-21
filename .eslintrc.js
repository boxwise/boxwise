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
  "plugins": ["eslint-plugin-import","react-hooks"],
  "extends": ["react-app","plugin:import/recommended"],
  "env": {
    "jasmine": true
  },
  "rules": {
    "import/order": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "error",
    "no-restricted-imports": [ "error",
      {
        "paths": [],
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
      "files": ["src/components/**"],
      "rules": {
        "no-restricted-imports": [ "error",
          {
            // rule: don't allow use of redux 
            // why: these components should be self-contained
            "paths": ["react-redux"],
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
      "files": ["src/modules/*/components/**"],
      "rules": {
        "no-restricted-imports": [ 
          "error", 
          {
            // rule: don't allow use of redux 
            // why: these are unconnected components that shouldn't
            //      be hooked up to redux. use containers instead.
            "paths": ["react-redux"],
            "patterns": [
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
        "moduleDirectory": ["node_modules", "src/"]
      }
    }
  }
}