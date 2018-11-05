'use strict'

function unpackPluralForms (forms, rules) {
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
