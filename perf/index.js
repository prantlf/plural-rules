import createSuite from './createSuite.js'
import { getPluralFormForCardinal } from 'plural-rules'
import { getPluralFormForCardinalByLocale } from 'fast-plural-rules'
import assert from 'assert'

function simpleCoded () {
  assert(getPluralFormForCardinalByLocale('en', 1) === 0)
  assert(getPluralFormForCardinalByLocale('en', 2) === 1)
  assert(getPluralFormForCardinalByLocale('en', 5) === 1)
  assert(getPluralFormForCardinalByLocale('en', 21) === 1)
}

function simpleParsed () {
  assert(getPluralFormForCardinal('en', 1) === 'one')
  assert(getPluralFormForCardinal('en', 2) === 'other')
  assert(getPluralFormForCardinal('en', 5) === 'other')
  assert(getPluralFormForCardinal('en', 21) === 'other')
}

function simpleNative () {
  assert(new Intl.PluralRules('en').select(1) === 'one')
  assert(new Intl.PluralRules('en').select(2) === 'other')
  assert(new Intl.PluralRules('en').select(5) === 'other')
  assert(new Intl.PluralRules('en').select(21) === 'other')
}

const en = new Intl.PluralRules('en')

function simpleNativeCached () {
  assert(en.select(1) === 'one')
  assert(en.select(2) === 'other')
  assert(en.select(5) === 'other')
  assert(en.select(21) === 'other')
}

function averageCoded () {
  assert(getPluralFormForCardinalByLocale('cs', 1) === 0)
  assert(getPluralFormForCardinalByLocale('cs', 2) === 1)
  assert(getPluralFormForCardinalByLocale('cs', 5) === 2)
  assert(getPluralFormForCardinalByLocale('cs', 21) === 2)
}

function averageParsed () {
  assert(getPluralFormForCardinal('cs', 1) === 'one')
  assert(getPluralFormForCardinal('cs', 2) === 'few')
  assert(getPluralFormForCardinal('cs', 5) === 'other')
  assert(getPluralFormForCardinal('cs', 21) === 'other')
}

function averageNative () {
  assert(new Intl.PluralRules('cs').select(1) === 'one')
  assert(new Intl.PluralRules('cs').select(2) === 'few')
  assert(new Intl.PluralRules('cs').select(5) === 'other')
  assert(new Intl.PluralRules('cs').select(21) === 'other')
}

const cs = new Intl.PluralRules('cs')

function averageNativeCached () {
  assert(cs.select(1) === 'one')
  assert(cs.select(2) === 'few')
  assert(cs.select(5) === 'other')
  assert(cs.select(21) === 'other')
}

function complicatedCoded () {
  assert(getPluralFormForCardinalByLocale('ru', 1) === 0)
  assert(getPluralFormForCardinalByLocale('ru', 2) === 1)
  assert(getPluralFormForCardinalByLocale('ru', 5) === 2)
  assert(getPluralFormForCardinalByLocale('ru', 21) === 0)
}

function complicatedParsed () {
  assert(getPluralFormForCardinal('ru', 1) === 'one')
  assert(getPluralFormForCardinal('ru', 2) === 'few')
  assert(getPluralFormForCardinal('ru', 5) === 'many')
  assert(getPluralFormForCardinal('ru', 21) === 'one')
}

function complicatedNative () {
  assert(new Intl.PluralRules('ru').select(1) === 'one')
  assert(new Intl.PluralRules('ru').select(2) === 'few')
  assert(new Intl.PluralRules('ru').select(5) === 'many')
  assert(new Intl.PluralRules('ru').select(21) === 'one')
}

const ru = new Intl.PluralRules('ru')

function complicatedNativeCached () {
  assert(ru.select(1) === 'one')
  assert(ru.select(2) === 'few')
  assert(ru.select(5) === 'many')
  assert(ru.select(21) === 'one')
}

createSuite('Getting a plural form...')
  .add('using a simple coded rule', simpleCoded)
  .add('using a simple parsed rule', simpleParsed)
  .add('using a simple native rule', simpleNative)
  .add('using a simple native cached rule', simpleNativeCached)
  .add('using an average coded rule', averageCoded)
  .add('using an average parsed rule', averageParsed)
  .add('using an average native rule', averageNative)
  .add('using an average native cached rule', averageNativeCached)
  .add('using a complicated coded rule', complicatedCoded)
  .add('using a complicated parsed rule', complicatedParsed)
  .add('using a complicated native rule', complicatedNative)
  .add('using a complicated native cached rule', complicatedNativeCached)
  .start()
