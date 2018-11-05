'use strict'

import {
  getPluralRulesForCardinals, getPluralFormForCardinal,
  setPluralFormsForCardinals, populatePluralData
} from './code'
import pluralData from './data'

populatePluralData(pluralData)

export { getPluralRulesForCardinals, getPluralFormForCardinal, setPluralFormsForCardinals }
