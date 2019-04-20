module.exports = {
  // this configuration exists for any eslint rules that we can
  // automatically fix in the git post-hook, and therefore do
  // not have to hassle anyone during development
  "rules": {
    "import/order": [ "error", 
      {
        "newlines-between": "always",
        "groups": ["builtin", "external", "internal", "parent", "sibling", "index"]
      }],
    "prefer-const": "error",
    "no-var": "error"
  }
}