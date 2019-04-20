module.exports = {
  // these rules should only be run when we are auto-fixing
  // don't bother hassling anyone during development
  "rules": {
    "import/order": [ "error", 
      {
        "newlines-between": "always",
        "groups": ["builtin", "external", "internal", "parent", "sibling", "index"]
      }]
  }
}