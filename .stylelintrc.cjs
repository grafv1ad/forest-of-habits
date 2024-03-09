module.exports = {
  extends: ["@hh.ru/stylelint-config-hh"],
  rules: {
    "declaration-property-value-disallowed-list": null,
    "declaration-property-value-allowed-list": null,
    "unit-allowed-list": null,
    "selector-max-id": [2],
    "selector-class-pattern": null,
  },
  ignoreFiles: ["dist/*"],
};
