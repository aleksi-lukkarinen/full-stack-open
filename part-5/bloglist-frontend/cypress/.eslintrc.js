module.exports = {
  "overrides": [
    {
      "files": [ "*.spec.js", "./support/*.js" ],
      "rules": {
        "prefer-arrow-callback": "off",
        "no-unused-expressions": "off",
        "jest/valid-expect": "off",
        "jest/valid-expect-in-promise": "off",
      }
    }
  ],
}
