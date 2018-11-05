interface PluralRules {
  [ key: string ]: number
}

interface PluralForms {
  [ key: string ]: string
}

interface PluralLocales {
  [ key: string ]: PluralRules
}

interface PluralData {
  rules?: Array<string>,
  cardinals: PluralLocales
}

declare function getPluralRulesForCardinals (locale: string): PluralRules
declare function getPluralFormForCardinal (localeOrRules: string | PluralRules, count: number): string
declare function setPluralFormsForCardinals (locale: string, forms: PluralForms): void
declare function populatePluralData (data: PluralData): void

export {
  getPluralRulesForCardinals, getPluralFormForCardinal,
  setPluralFormsForCardinals, populatePluralData
}

export as namespace pluralRules
