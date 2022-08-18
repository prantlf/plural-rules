/* global it, expect */

import { getSupportedLocales } from '../src/index.js'

it('is exported as a function', () => {
  expect(typeof getSupportedLocales === 'function').toBeTruthy()
})

it('returns some supported locales', () => {
  expect(getSupportedLocales().includes('cs')).toBeTruthy()
})

it('returns some supported locales when called once more', () => {
  expect(getSupportedLocales().includes('cs')).toBeTruthy()
})
