/* global it, expect */

import { getPluralRulesForCardinals, getPluralFormForCardinal } from '../src/index.js'

it('is exported as a function', () => {
  expect(typeof getPluralRulesForCardinals === 'function').toBeTruthy()
})

it('returns English rules', () => {
  const rules = getPluralRulesForCardinals('en')
  expect(typeof rules).toEqual('object')
  expect(Object.keys(rules).length).toEqual(2)
  expect(typeof rules.one).toEqual('number')
  expect(typeof rules.other).toEqual('number')
})

it('allows to compute English plurals', () => {
  const rules = getPluralRulesForCardinals('en')
  expect(getPluralFormForCardinal(rules, 0)).toEqual('other')
  expect(getPluralFormForCardinal(rules, 1)).toEqual('one')
  expect(getPluralFormForCardinal(rules, 2)).toEqual('other')
})

it('throws an error for an unrecognized locale', () => {
  expect(() => getPluralRulesForCardinals('invalid')).toThrow()
})
