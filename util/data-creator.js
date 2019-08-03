'use strict'

const { outputFile: writeFile } = require('fs-extra')
const originalPluralData = require('cldr-data/supplemental/plurals')
const { packPluralForms } = require('./data-packer')
const { unpackPluralForms } = require('./data-unpacker')

function normalizeLocale (locale) {
  return locale.toLowerCase().replace('_', '-')
}

function getLanguage (locale) {
  const separator = locale.indexOf('-')
  return separator > 0 && locale.substr(0, separator)
}

function isRequestedLocale (availableLocale, locales, languages) {
  if (!locales.length) {
    return true
  }
  availableLocale = normalizeLocale(availableLocale)
  // Look either fr the requested locale, or only for the language.
  return locales.includes(availableLocale) ||
    languages.includes(availableLocale)
}

function transformData (data, options) {
  let { locales = [], packed, includeVersion } = options
  const supplemental = data.supplemental
  const transformForms = packed ? packPluralForms : unpackPluralForms
  locales = locales.map(normalizeLocale)
  const languages = locales.map(getLanguage)
  // Collect unique plural rules.
  let rules = []
  // Rename the key "plurals-type-cardinal" to "pluralCardinals".
  const originalForms = supplemental['plurals-type-cardinal']
  const cardinals = Object
    .keys(originalForms)
    .filter(locale => isRequestedLocale(locale, locales, languages))
    .reduce((result, locale) => {
      // Pack plural forms and rules for the specific locale.
      const forms = originalForms[locale]
      result[normalizeLocale(locale)] = transformForms(forms, rules)
      return result
    }, {})
  if (!rules.length) {
    rules = undefined
  }
  // Unwrap the "supplemental" object.
  const version = includeVersion ? supplemental.version : undefined
  return { version, rules, cardinals }
}

function formatES6Module (content) {
  return `export default ${content}`
}

function formatCJSModule (content) {
  return `module.exports = ${content}`
}

function formatAMDModule (content) {
  return `define(function () {
  return ${content}
})`
}

function formatUMDModule (content, umdName) {
  return `(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  factory(global.${umdName || 'pluralData'} = {})
} (this, (function (exports) {
  Object.assign(exports, ${content})
  Object.defineProperty(exports, '__esModule', { value: true })
})))`
}

function createPluralData (options = {}) {
  const {
    asModule, asCjsModule, asAmdModule, asUmdModule, umdName, outputFile
  } = options
  const data = transformData(originalPluralData, options)
  let content = JSON.stringify(data, undefined, 2)
  if (asModule) {
    content = formatES6Module(content)
  } else if (asCjsModule) {
    content = formatCJSModule(content)
  } else if (asAmdModule) {
    content = formatAMDModule(content)
  } else if (asUmdModule) {
    content = formatUMDModule(content, umdName)
  }
  if (outputFile) {
    console.log(`Writing plural data module "${outputFile}"...`)
    return writeFile(outputFile, content)
  }
  return Promise.resolve(content)
}

exports.createPluralData = createPluralData
