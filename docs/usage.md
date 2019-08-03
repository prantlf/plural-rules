# Usage Scenarios

The minimal, but powerful API of this module provides functionality for finding the right localizable message which includes a cardinal - an item count.

### Table of Contents

- [Author a language pack](#author-a-language-pack)
- [Get a localized message in the right plural form](#get-a-localized-message-in-the-right-plural-form)
- [Get plural rules for computing the plural form](#get-plural-rules-for-computing-the-plural-form)
- [Limit supported languages](#limit-supported-languages)

## Author a language pack

Translators need to know, how many and what plural forms the target language needs, to be able to assign the proper number of strings to proper keys in an object representing a localizable message. For example:

```js
// English language pack
{
  "validationFailed": "File validation failed.",  // Simple message
  "invalidFileCount": {  // Message consisting of more plural forms
    "one":   "{0} invalid file",  // singular
    "other": "{0} invalid files"  // plural
  }
}

// Czech language pack
{
  "validationFailed": "Kontrola souborů selhala.", // Simple message
  "invalidFileCount": {   // Message consisting of more plural forms
    "one":   "{0} vadný soubor",   // singular
    "few":   "{0} vadné soubory",  // plural for 2-4 items
    "other": "{0} vadných souborů" // plural for 5 and more items
  }
}
```

Have a look at the [list of plural rules and number of plural forms for locales supported by this library](./languages.md#supported-languages).

## Get a localized message in the right plural form

Language packs usually contain localized expressions, which are looked up by their keys. If an expression contains a parameter, for example a number placeholder "{fileCount}", only one text message is not enough to cover all grammar rules for different cardinals, which could occur in the parameter value. If expressions, which cover all grammar rules, are stored in an array, the function [`getPluralFormForCardinal`](./API.md#getpluralformforcardinal) will return the index of the right expression in the array, provided with the target locale and the cardinal value.

```js
const { getPluralFormForCardinal } = require('plural-rules')
let locale

localizePluralMessage('en', 'invalidFileCount', 1)
// Returns "1 invalid file".
localizePluralMessage('en', 'invalidFileCount', 2)
// Returns "2 invalid files".
localizePluralMessage('en', 'invalidFileCount', 5)
// Returns "5 invalid files".

localizePluralMessage('cs', 'invalidFileCount', 1)
// Returns "1 vadný soubor".
localizePluralMessage('cs', 'invalidFileCount', 2)
// Returns "2 vadné soubory".
localizePluralMessage('cs', 'invalidFileCount', 5)
// Returns "5 vadných souborů".

// Finds the message with the right plural form using the specified locale,
// message key and item count.
function localizePluralMessage(locale, messageKey, itemCount) {
  // Get all localized messages from the language pack for the specified locale.
  const localizedMessages = languagePacks[locale]
  // Get all plural forms for the specified message.
  const messagePluralForms = localizedMessages[messageKey]
  // Get the index of the plural form for the specified locale and cardinal.
  const pluralForm = getPluralFormForCardinal(locale, itemCount)
  // Get the localized message in the right plural form.
  const message = messagePluralForms[pluralForm]
  // Replace the parameter placeholder with the cardinal value (item count).
  return message.replace('{0}', itemCount)
}

// Localized messages organized by locales and message keys.
const languagePacks = {
  en: {
    invalidFileCount: {
      one:   '{0} invalid file', // singular
      other: '{0} invalid files' // plural
    }
  },
  cs: {
    invalidFileCount: {
      one:   '{0} vadný soubor',   // singular
      few:   '{0} vadné soubory',  // plural for 2-4 items
      other: '{0} vadných souborů' // plural for 5 and more items
    }
  }
}
```

See the function [`getPluralFormForCardinal`](./API.md#getpluralformforcardinal) for more information.

## Get plural rules for computing the plural form

This scenario implements a similar interface for the localized message lookup like the previous [getting a localized message in the right plural form](#get-a-localized-message-in-the-right-plural-form). As a difference, it demonstrates how to obtain the plural rules and use them multiple times without always carrying the locale around.

```js
const {
  getPluralRulesForCardinals, getPluralFormForCardinal
} = require('plural-rules')

setLocale('en')

localizePluralMessage('invalidFileCount', 1)
// Returns "1 invalid file".
localizePluralMessage('invalidFileCount', 2)
// Returns "2 invalid files".
localizePluralMessage('invalidFileCount', 5)
// Returns "5 invalid files".

setLocale('cs')

localizePluralMessage('invalidFileCount', 1)
// Returns "1 vadný soubor".
localizePluralMessage('invalidFileCount', 2)
// Returns "2 vadné soubory".
localizePluralMessage('invalidFileCount', 5)
// Returns "5 vadných souborů".

// Control the localization methods, when a locale is set.
let localizedMessages, pluralRules

// Makes the specified locale work globally, with all what is needed for it.
function setLocale (locale) {
  // Find the language pack for future message lookups.
  localizedMessages = languagePacks[locale]
  // Find the plural rule function for future plural form lookups.
  pluralRules = getPluralRulesForCardinals(locale)
}

// Finds the message with the right plural form using the global locale
// and the specified message key with the item count.
function localizePluralMessage(messageKey, itemCount) {
  // Get all plural forms for the specified message.
  const messagePluralForms = localizedMessages[messageKey]
  // Get the index of the plural form for the specified cardinal.
  const pluralForm = getPluralFormForCardinal(pluralRules, itemCount)
  // Set the cardinal (item count) parameter to the looked up plural form.
  return messagePluralForms[pluralForm].replace('{0}', itemCount)
}

// Localized messages organized by message keys in language packs by locales.
const languagePacks = {
  en: {
    invalidFileCount: {
      one:   '{0} invalid file', // singular
      other: '{0} invalid files' // plural
    }
  },
  cs: {
    invalidFileCount: {
      one:   '{0} vadný soubor',   // singular
      few:   '{0} vadné soubory',  // plural for 2-4 items
      other: '{0} vadných souborů' // plural for 5 and more items
    }
  }
}
```

See the function [getPluralRulesForCardinals](./API.md#getpluralrulesforcardinals) for more information.

## Limit supported languages

All [CLDR plural rules] cover [almost 200 languages](./languages.md#supported-languages). If you localize yuour project only to a couple of languages, you can initialize this library only with a subset of plural rules to cover only the requested locales and decrease the loading time of your application. For example, the difference between the complete plural support, the support for all European languages (be, bg, bs, cs, da, de, el, en, es, et, fi, fr, ga, gd, hr, hu, is, it, lb, lt, lv, mk, mt, nl, nn, pl, pt, ro, ru, sc, sk, sl, sr, sv, uk) and the support for Central Europe only (en + cs, de, hu, pl, sk):

```
All languages: 15.3 kB minified, 2.83 KB gzipped
 35 languages: 7.18 kB minified, 1.39 gzipped
  6 languages: 1.14 KB minified, 0.37 KB gzipped
```

A module with a subset of supported languages can be generated by the command-line tool packaged with this library:

```sh
create-plural-data -pm en cs de hu ol skcs >plural-data.js
```

Custom plural data can be used if the module `code` is imported instead of the default `index` module, which bundles support for all languages:

```js
import { populatePluralData, getPluralFormForCardinal } from 'plural-rules'
import pluralData from 'plural-data'

populatePluralData(pluralData) // Initialize the library

const pluralForm = getPluralFormForCardinal('cs', 2) // Returns "few"
```

If you use UMD modules to load your application in the web browser, you can generate an UMD module too:

```sh
create-plural-data -pu en cs de hu ol skcs >plural-data.umd.js
```

Custom plural data can be used if the module `code` is loaded instead of the default `index` module, which bundles support for all languages.

```html
<script src="https://unpkg.com/plural-rules@1.0.0/dist/code.umd.min.js"></script>
<script src=".../plural-data.umd.js"></script>
<script>
  (() => {
    const { populatePluralData, getPluralFormForCardinal } = window.pluralRules

    populatePluralData(window.pluralData) // Initialize the library

		const pluralForm = getPluralFormForCardinal('cs', 2) // Returns "few"
  })()
</script>
```

When you generate data for the function `populatePluralData`, make sure, that you generate them "packed". Use the option `--packed` (`-p`) of the custom data generator (`create-plural-data`). See the function [populatePluralData](./API.md#populatepluraldata) for more information.

[CLDR plural rules]: http://cldr.unicode.org/index/cldr-spec/plural-rules
