interface PluralRules {
  [ key: string ]: number
}

interface PluralForms {
  [ key: string ]: string
}

declare function getPluralRulesForCardinals (locale: string): PluralRules
declare function getPluralFormForCardinal (localeOrRules: string | PluralRules, count: number): string
declare function setPluralFormsForCardinals (locale: string, forms: PluralForms): void

export {
  getPluralRulesForCardinals, getPluralFormForCardinal, setPluralFormsForCardinals
}

export as namespace pluralRules
