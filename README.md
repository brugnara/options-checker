# options-checker
> 11/10/18

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Build Status](https://travis-ci.org/brugnara/options-checker.svg?branch=master)](https://travis-ci.org/brugnara/options-checker)

### the heck!?111

Use this to check if all params are valid. All of them can be
overridden with the `_id` section. The parameter will change
its requirements while assuming the value passed.

In this example, when `action` assumes the value `addE`,
`name` became not mandatory but `fromName` and `toName` yes.

The example also shows that you can pass values you accept.
`true` simply means the key is mandatory to exists.

### example

```js
const neededOptions = {
  action: ['addE', 'addV', 'drop'],
  label: true,
  name: true,
  _if: {
    action: {
      'addE': {
        name: false,
        fromName: true,
        toName: true
      }
    }
  }
}
```

> node example.js --action addV --name test --label lbl

```
const result = optionsChecker(require('minimist')(process.argv), neededOptions)
// {
//   "valid": true
// }
```

> node example.js --action addE --name test --label lbl

```
const result = optionsChecker(require('minimist')(process.argv), neededOptions)
// {
//   "valid": false,
//   "option": "nameFrom"
// }
```

> node example.js --action addM --name test --label lbl

```
const result = optionsChecker(require('minimist')(process.argv), neededOptions)
// {
//   "valid": false,
//   "option": "action",
//   "validOptions": ["addE", "addV", "drop"]
// }
```
