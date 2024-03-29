const {
  getPluralRulesForCardinals, getPluralFormForCardinal,
  setPluralFormsForCardinals, populatePluralData
} = require('../dist/code.cjs')

populatePluralData({
  rules: [
    'i = 1 and v = 0 @integer 1',
    '@integer 0, 2~16, 100, … @decimal 0.0~1.5, 10.0, 100.0, …'
  ],
  cardinals: {
    test: {
      one: 0,
      other: 1
    }
  }
})
getPluralFormForCardinal('test', 1)
const rules = getPluralRulesForCardinals('test')
getPluralFormForCardinal(rules, 1)
setPluralFormsForCardinals('test', {
  one: 'i = 1 and v = 0 @integer 1',
  'pluralRule-count-other': ' @integer  0, 2~16, 100, … @decimal 0.0~1.5, 10.0, 100.0, …'
})
