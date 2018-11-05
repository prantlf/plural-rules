'use strict'

import parsePluralRule from 'cldrpluralruleparser'
import { packPluralForms } from './data-packer'

let rules = []
let cardinals = {}

function normalizeLocale (locale) {
  return locale.toLowerCase().replace('_', '-')
}

function getLanguage (locale) {
  const separator = locale.indexOf('-')
  return separator > 0 && locale.substr(0, separator)
}

function getPluralRulesForCardinals (locale) {
  locale = normalizeLocale(locale)
  let forms = cardinals[locale]
  if (forms === undefined) {
    const language = getLanguage(locale)
    if (language) {
      forms = cardinals[language]
    }
  }
  if (forms === undefined) {
    throw new Error(`Unrecognized locale: "${locale}".`)
  }
  return forms
}

function getPluralFormForCardinal (locale, count) {
  const forms = typeof locale !== 'string' ? locale
    : getPluralRulesForCardinals(locale)
  for (const form in forms) {
    const rule = forms[form]
    if (parsePluralRule(rules[rule], count)) {
      return form
    }
  }
}

function setPluralFormsForCardinals (locale, forms) {
  locale = normalizeLocale(locale)
  cardinals[locale] = packPluralForms(forms, rules)
}

function populatePluralData (data) {
  rules = data.rules
  cardinals = data.cardinals
}

export {
  getPluralRulesForCardinals, getPluralFormForCardinal,
  setPluralFormsForCardinals, populatePluralData
}
