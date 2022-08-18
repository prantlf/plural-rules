/* global it, expect */

import { getPluralFormsForLocale } from '../src/index.js'

it('is exported as a function', () => {
  expect(typeof getPluralFormsForLocale === 'function').toBeTruthy()
})

it('returns plural form names for a supported locale', () => {
  expect(getPluralFormsForLocale('cs')).toEqual(['one', 'few', 'many', 'other'])
})

it('returns an undefined for an unsupported locale', () => {
  expect(getPluralFormsForLocale('dummy')).toEqual(undefined)
})
