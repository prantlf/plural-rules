/* global it, expect */

import data from '../src/data.js'
import { parsePluralForms } from '../src/data-indexer.js'

const { rules, cardinals } = data

it('are exported as an object', () => {
  expect(typeof cardinals === 'object').toBeTruthy()
})

it('all locales point to a valid rule index', () => {
  for (const locale in cardinals) {
    const forms = parsePluralForms(cardinals[locale])
    for (const form in forms) {
      const rule = forms[form]
      expect(typeof rules[rule]).toEqual('string')
    }
  }
})
