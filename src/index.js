import {
  getPluralRulesForCardinals, getPluralFormForCardinal,
  setPluralFormsForCardinals, populatePluralData
} from './code.js'
import pluralData from './data.js'

populatePluralData(pluralData)

export { getPluralRulesForCardinals, getPluralFormForCardinal, setPluralFormsForCardinals }
