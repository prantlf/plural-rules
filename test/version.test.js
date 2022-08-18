/* global it, expect */

import data from '../src/data.js'

const { version } = data

it('is exported as an object', () => {
  expect(typeof version === 'object').toBeTruthy()
})

it('contains UNICODE and CLDR versions', () => {
  const { _unicodeVersion, _cldrVersion } = version
  expect(typeof _unicodeVersion).toEqual('string')
  expect(typeof _cldrVersion).toEqual('string')
})
