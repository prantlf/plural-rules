'use strict'

// Input string with the object serialized:
//   "one:0,other:1"
// Output forms, names pointing to array indexes of their rules:
//   {
//     "one": 0,
//     "other": 1
//   }
function parsePluralForms (serializedForms) {
  return serializedForms
    .split(',')
    .reduce((result, serializedForm) => {
      const parts = serializedForm.split(':')
      result[parts[0]] = +parts[1]
      return result
    }, {})
}

// Input rules, an array of distinct strings:
//   [
//     "i = 1 and v = 0 @integer 1",
//     " @integer 0, 2~16, 100, 1000, 10000, 100000, 1000000, …
//        @decimal 0.0~1.5, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …",
//     ...
//   ]
// Input forms, names pointing to array indexes of their rules:
//   "one:0,other:1"
// Output forms with rules:
//   {
//     "pluralRule-count-one": "i = 1 and v = 0 @integer 1",
//     "pluralRule-count-other": " @integer 0, 2~16, 100, 1000, 10000, 100000, 1000000, …
//       @decimal 0.0~1.5, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"
//   }
function unpackPluralForms (forms, rules) {
  // Earlier versions did not pack the plural forms to a string.
  if (typeof forms === 'string') {
    forms = parsePluralForms(forms)
  }
  // Iterate over all plural forms.
  return Object
    .keys(forms)
    .reduce((result, form) => {
      // Retrieve the plural rule from the de-duplication array.
      let rule = forms[form]
      if (typeof rule === 'number') {
        rule = rules[rule]
      }
      // Cut off prefixes "pluralRule-count- from plural forms.
      if (form.length > 17) {
        form = form.substr(17)
      }
      result[form] = rule
      return result
    }, {})
}

exports.unpackPluralForms = unpackPluralForms
