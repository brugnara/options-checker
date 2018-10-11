/**
 * Created by brugnara on 11/10/18,
 * @ daniele@brugnara.me
 */

'use strict'

const Debug = require('debug')
const debug = Debug('options-checker:index')

module.exports = function (_args, _options) {
  if (!_args || !_options) {
    throw new Error('args and options are required arguments')
  }

  if (Object.keys(_args).length === 0 || Object.keys(_options).length === 0) {
    throw new Error('args and options should contain something')
  }

  const args = JSON.parse(JSON.stringify(_args))
  const options = JSON.parse(JSON.stringify(_options))

  if (options._if) {
    debug('navigating _if')
    debug('before')
    debug(options)

    const keys = Object.keys(options._if)
    let len = keys.length

    while (len--) {
      const key = keys[len]
      const option = options._if[key]
      // adjust required options accordingly
      if (args[key] && option[args[key]]) {
        // do!
        Object.keys(option[args[key]]).forEach(k => {
          options[k] = option[args[key]][k]
        })
      }
    }
    delete options._if
    debug('after')
  } else {
    debug('no _if condition')
  }

  debug(options)

  const keys = Object.keys(options)
  let len = keys.length

  while (len--) {
    const key = keys[len]
    const option = options[key]

    if (Array.isArray(option) && !option.includes(args[key])) {
      debug(`${key} must be one of: [${option.join(', ')}]`)
      return {
        valid: false,
        option: key,
        validOptions: option
      }
    }

    if (option === true && (!args[key] || args[key] === true)) {
      debug(`${key} is mandatory`)
      return {
        valid: false,
        option: key
      }
    }
  }

  return {
    valid: true
  }
}
