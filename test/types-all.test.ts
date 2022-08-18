import {
  getPluralRulesForCardinals, getPluralFormForCardinal,
  setPluralFormsForCardinals, populatePluralData,
  getSupportedLocales, getPluralFormsForLocale,
  PluralRules
} from '../src/code'

declare type testCallback = () => void
declare function test (label: string, callback: testCallback)

test('Type declarations for TypeScript', () => {
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
  let _pluralForm: string
  _pluralForm = getPluralFormForCardinal('test', 1)
  const rules: PluralRules = getPluralRulesForCardinals('test')
  _pluralForm = getPluralFormForCardinal(rules, 1)
  setPluralFormsForCardinals('test', {
    one: 'i = 1 and v = 0 @integer 1',
    'pluralRule-count-other': ' @integer  0, 2~16, 100, … @decimal 0.0~1.5, 10.0, 100.0, …'
  })
  const _locales: string[] = getSupportedLocales()
  const _pluralForms: string[] | undefined = getPluralFormsForLocale('cs')
})
