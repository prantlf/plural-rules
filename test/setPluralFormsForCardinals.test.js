/* global it, expect */

import { getPluralFormForCardinal, setPluralFormsForCardinals } from '../src/index'

it('is exported as a function', () => {
  expect(typeof setPluralFormsForCardinals === 'function').toBeTruthy()
})

it('registers plural rules for a new locale', () => {
  setPluralFormsForCardinals('test', {
    'one': 'i = 1 and v = 0 @integer 1',
    'pluralRule-count-other': ' @integer  0, 2~16, 100, … @decimal 0.0~1.5, 10.0, 100.0, …'
  })
  expect(getPluralFormForCardinal('test', 1)).toEqual('one')
  expect(getPluralFormForCardinal('test', 2)).toEqual('other')
})
