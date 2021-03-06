'use strict'
const TestRunner = require('test-runner')
const cliArgs = require('../')
const a = require('assert')

const runner = new TestRunner()

runner.test('default value', function () {
  a.deepStrictEqual(cliArgs([ { name: 'one' }, { name: 'two', defaultValue: 'two' } ], [ '--one', '1' ]), {
    one: '1',
    two: 'two'
  })
  a.deepStrictEqual(cliArgs([{ name: 'two', defaultValue: 'two' }], []), {
    two: 'two'
  })
  a.deepStrictEqual(cliArgs([{ name: 'two', defaultValue: 'two' }], [ '--two', 'zwei' ]), {
    two: 'zwei'
  })
  a.deepStrictEqual(
    cliArgs([{ name: 'two', multiple: true, defaultValue: ['two', 'zwei'] }], [ '--two', 'duo' ]),
    { two: [ 'duo' ] }
  )
})

runner.test('default value 2', function () {
  const defs = [{ name: 'two', multiple: true, defaultValue: ['two', 'zwei'] }]
  const result = cliArgs(defs, [])
  a.deepStrictEqual(result, { two: [ 'two', 'zwei' ] })
})

runner.test('default value: array as defaultOption', function () {
  const defs = [
    { name: 'two', multiple: true, defaultValue: ['two', 'zwei'], defaultOption: true }
  ]
  const argv = [ 'duo' ]
  a.deepStrictEqual(cliArgs(defs, argv), { two: [ 'duo' ] })
})

runner.test('default value: falsy default values', function () {
  const defs = [
    { name: 'one', defaultValue: 0 },
    { name: 'two', defaultValue: false }
  ]

  const argv = []
  a.deepStrictEqual(cliArgs(defs, argv), {
    one: 0,
    two: false
  })
})

runner.test('default value: is arrayifed if multiple set', function () {
  const defs = [
    { name: 'one', defaultValue: 0, multiple: true }
  ]

  let argv = []
  a.deepStrictEqual(cliArgs(defs, argv), {
    one: [ 0 ]
  })
  argv = [ '--one', '2' ]
  a.deepStrictEqual(cliArgs(defs, argv), {
    one: [ '2' ]
  })
})
