/* global it, expect */

import data from '../src/data'

const { rules } = data

it('are exported as an array', () => {
  expect(Array.isArray(rules)).toBeTruthy()
})

it('all of them are strings', () => {
  for (const rule of rules) {
    expect(typeof rule).toEqual('string')
  }
})
