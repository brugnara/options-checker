/**
 * Created by brugnara on 11/10/18,
 * @ daniele@brugnara.me
 */

'use strict'

// test requirements
require('mocha')
const should = require('should')
const rndm = require('rndm')

// utils
const debug = require('debug')('test:options-checker:01-base')

// module to test
const Module = require('../')

describe('# 01-base', function () {
  describe('module initializing', function () {
    it('should throw errors with missing params', function () {
      should.throws(function () {
        Module()
      })
      should.throws(function () {
        Module(null, {})
      })
      should.throws(function () {
        Module({})
      })
      should.throws(function () {
        Module({}, {})
      })
      should.throws(function () {
        Module({ a: 1 }, {})
      })
      should.throws(function () {
        Module({}, { b: false })
      })
    })

    it('should not throw errors if nothing is missing', function () {
      Module({ a: true }, { b: false })
    })
  })

  describe('standard values', function () {
    it('should return valid status with one item', function () {
      const result = Module({
        action: rndm(4)
      }, {
        action: true
      })

      result.should.have.property('valid', true)
    })

    it('should return valid status with not needed item', function () {
      const result = Module({
        action: rndm(4),
        test: rndm(4)
      }, {
        action: true
      })

      result.should.have.property('valid', true)
    })

    it('should return valid status with more needed items', function () {
      const result = Module({
        action: rndm(4),
        test: rndm(4)
      }, {
        action: true,
        test: true
      })

      result.should.have.property('valid', true)
    })

    it('should return valid status with a range item', function () {
      const result = Module({
        action: 'test',
        test: rndm(4)
      }, {
        action: ['test'],
        test: true
      })

      result.should.have.property('valid', true)
    })

    it('should return valid status with range items', function () {
      const result = Module({
        action: 'test2',
        test: rndm(4)
      }, {
        action: ['test', 'test2'],
        test: true
      })

      result.should.have.property('valid', true)
    })

    it('should return invalid status with wrong range items', function () {
      const result = Module({
        action: 'test23',
        test: rndm(4)
      }, {
        action: ['test', 'test2'],
        test: true
      })

      result.should.have.properties({
        valid: false,
        option: 'action'
      })

      result.validOptions.should.deepEqual(['test', 'test2'])
    })
  })

  describe('conditions', function () {
    it('should work with custom options, overriding if needed #1', function () {
      const result = Module({
        action: 'test',
        testB: rndm(5),
        testC: 'ciao'
      }, {
        action: true,
        test: true,
        _if: {
          action: {
            'test': {
              test: false,
              testB: true,
              testC: true
            }
          }
        }
      })

      result.should.have.properties({
        valid: true
      })
    })

    it('should work with custom options, overriding if needed #2', function () {
      const result = Module({
        action: 'test',
        testB: rndm(5),
        testC: 'ciao'
      }, {
        action: true,
        test: true,
        _if: {
          action: {
            'test-2': {
              test: false,
              testB: true,
              testC: true
            }
          }
        }
      })

      result.should.have.properties({
        valid: false,
        option: 'test'
      })
    })
  })
})
