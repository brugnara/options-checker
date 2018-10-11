/**
 * Created by brugnara on 11/10/18,
 * @ daniele@brugnara.me
 */

const optionsChecker = require('options-checker')
const neededOptions = {
  action: ['addE', 'addV', 'drop'],
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

// valid: true
console.log(optionsChecker({
  action: 'addE',
  fromName: 'start',
  toName: 'end'
}, neededOptions))

// valid: false, option: name
console.log(optionsChecker({
  action: 'addV'
}, neededOptions))

// valid: false, option: action, validOptions: ['addE', 'addV', 'drop']
console.log(optionsChecker({
  action: 'junk',
  name: 'junk2'
}, neededOptions))
