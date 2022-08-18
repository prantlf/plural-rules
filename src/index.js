import {
  getPluralRulesForCardinals, getPluralFormForCardinal,
  setPluralFormsForCardinals, populatePluralData,
  getSupportedLocales, getPluralFormsForLocale
} from './code.js'
import pluralData from './data.js'

populatePluralData(pluralData)

export {
  getPluralRulesForCardinals, getPluralFormForCardinal,
  setPluralFormsForCardinals,
  getSupportedLocales, getPluralFormsForLocale
}
