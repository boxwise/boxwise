module.exports = {
  // this configuration exists for any eslint rules that we can
  // automatically fix in the git post-hook, and therefore do
  // not have to hassle anyone during development
  // the rest of auto-formatting is dealth with prettier instead
  "rules": {
    "import/order": [ "error", 
    {
      "newlines-between": "always",
      "groups": ["builtin", "external", "internal", "parent", "sibling", "index"]
    }],
    // don't try to auto-fix these, you can get weird
    // layouts
    'no-else-return': ['off'],
  }
}