/* global it, expect */

import { getPluralFormForCardinal } from '../src/index'

it('is exported as a function', () => {
  expect(typeof getPluralFormForCardinal === 'function').toBeTruthy()
})

it('computes English plurals', () => {
  expect(getPluralFormForCardinal('en', 0)).toEqual('other')
  expect(getPluralFormForCardinal('en', 1)).toEqual('one')
  expect(getPluralFormForCardinal('en', 2)).toEqual('other')
})

it('computes Czech plurals', () => {
  expect(getPluralFormForCardinal('cs', 0)).toEqual('other')
  expect(getPluralFormForCardinal('cs', 1)).toEqual('one')
  expect(getPluralFormForCardinal('cs', 2)).toEqual('few')
  expect(getPluralFormForCardinal('cs', 3)).toEqual('few')
  expect(getPluralFormForCardinal('cs', 4)).toEqual('few')
  expect(getPluralFormForCardinal('cs', 5)).toEqual('other')
  expect(getPluralFormForCardinal('cs', 10)).toEqual('other')
  expect(getPluralFormForCardinal('cs', 21)).toEqual('other')
})

it('computes Russian plurals', () => {
  expect(getPluralFormForCardinal('ru', 0)).toEqual('many')
  expect(getPluralFormForCardinal('ru', 1)).toEqual('one')
  expect(getPluralFormForCardinal('ru', 2)).toEqual('few')
  expect(getPluralFormForCardinal('ru', 3)).toEqual('few')
  expect(getPluralFormForCardinal('ru', 4)).toEqual('few')
  expect(getPluralFormForCardinal('ru', 5)).toEqual('many')
  expect(getPluralFormForCardinal('ru', 10)).toEqual('many')
  expect(getPluralFormForCardinal('ru', 21)).toEqual('one')
})

it('normalizes an uppercase locale using underscores', () => {
  expect(getPluralFormForCardinal('PT_PT', 1)).toEqual('one')
})

it('defaults to a language if a specific country is not available', () => {
  expect(getPluralFormForCardinal('pt-BR', 1)).toEqual('one')
})

it('throws an error for an unrecognized locale', () => {
  expect(() => getPluralFormForCardinal('invalid')).toThrow()
})
