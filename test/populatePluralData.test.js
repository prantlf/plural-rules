/* global it, expect */

import { getPluralFormForCardinal, populatePluralData } from '../src/code.js'

it('is exported as a function', () => {
  expect(typeof populatePluralData === 'function').toBeTruthy()
})

it('registers plural rules for a new locale', () => {
  populatePluralData({
    rules: [
      'i = 1 and v = 0 @integer 1',
      '@integer 0, 2~16, 100, … @decimal 0.0~1.5, 10.0, 100.0, …'
    ],
    cardinals: {
      test: {
        one: 0,
        other: 1
      }
    }
  })
  expect(getPluralFormForCardinal('test', 1)).toEqual('one')
  expect(getPluralFormForCardinal('test', 2)).toEqual('other')
})
