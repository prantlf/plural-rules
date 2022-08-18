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

export function getPluralRulesForCardinals (locale: string): PluralRules
export function getPluralFormForCardinal (localeOrRules: string | PluralRules, count: number): string
export function setPluralFormsForCardinals (locale: string, forms: PluralForms): void
export function populatePluralData (data: PluralData): void

export function getSupportedLocales(): string[]
export function getPluralFormsForLocale(locale: string): string[]

export as namespace pluralRules
