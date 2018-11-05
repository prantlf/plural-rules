'use strict'

function packPluralForms (forms, rules) {
  // Iterate over all plural forms.
  return Object
    .keys(forms)
    .reduce((result, form) => {
      // Refer to plural rules in the de-duplication array.
      let rule = forms[form]
      if (typeof rule === 'string') {
        rule = rule.trim().replace(/ {2}/g, ' ')
        let index = rules.indexOf(rule)
        if (index < 0) {
          index = rules.length
          rules.push(rule)
        }
        rule = index
      }
      // Cut off prefixes "pluralRule-count- from plural forms.
      if (form.length > 17) {
        form = form.substr(17)
      }
      result[form] = rule
      return result
    }, {})
}

export { packPluralForms }
