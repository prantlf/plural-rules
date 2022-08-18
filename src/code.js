import parsePluralRule from 'cldrpluralruleparser'
import { indexPluralForms, parsePluralForms } from './data-indexer.js'

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
  let language
  if (forms === undefined) {
    language = getLanguage(locale)
    if (language) {
      forms = cardinals[language]
    }
  }
  if (forms === undefined) {
    throw new Error(`Unrecognised locale: "${locale}".`)
  } else if (typeof forms === 'string') {
    forms = parsePluralForms(forms)
    cardinals[language || locale] = forms
  }
  return forms
}

function getPluralFormForCardinal (locale, count) {
  const forms = typeof locale !== 'string'
    ? locale
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
  cardinals[locale] = indexPluralForms(forms, rules)
}

function populatePluralData (data) {
  rules = data.rules
  cardinals = data.cardinals
}

export {
  getPluralRulesForCardinals, getPluralFormForCardinal,
  setPluralFormsForCardinals, populatePluralData
}
