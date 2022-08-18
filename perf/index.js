import createSuite from './createSuite.js'
import { getPluralFormForCardinalByLocale } from 'fast-plural-rules'
import { getPluralFormForCardinal } from 'plural-rules'
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

createSuite('Getting a plural form...')
  .add('using a simple coded rule', simpleCoded)
  .add('using a simple parsed rule', simpleParsed)
  .add('using an average coded rule', averageCoded)
  .add('using an average parsed rule', averageParsed)
  .add('using a complicated coded rule', complicatedCoded)
  .add('using a complicated parsed rule', complicatedParsed)
  .start()
