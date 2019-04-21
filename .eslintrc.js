module.exports = {
  "plugins": ["eslint-plugin-import","react-hooks"],
  "extends": ["react-app","plugin:import/errors"],
  "env": {
    "jasmine": true
  },
  "rules": {
    "import/order": ["off"],
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "error",
    "no-restricted-imports": [ "error",
      {
        "patterns": [
          /* 
            rule: don't allow relative imports that go up the tree more than one level
            why: preventing weird hierarchies for files */
          "../../**",
          /* 
            rule: don't allow imports of internal module files
            why: you should use the public 'API' exposed by the module
           */
          "modules/*/*/**"
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
            /* rule: don't allow use of redux 
               why: these components should be self-contained */
            "paths": ["react-redux"],
            "patterns": [
              /* 
                rule: don't allow relative imports that go up the tree
                why: these components should be self-contained */
              "../**",
              /* 
                rule: don't allow imports of modules
                why: these components should be standalone */
              "modules/**"
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
            /* rule: don't allow use of redux 
               why: these are unconnected components that shouldn't
                    be hooked up to redux. use containers instead. */
            "paths": ["react-redux"],
            "patterns": [
              /* 
                rule: don't allow relative imports that go up the tree more than one level 
                why: preventing weird hierarchies for files*/
              "../../**",
              /* rule: don't allow imports of internal modules 
                why: you should use the public 'API' exposed by the module */
              "modules/*/*/**" ]
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