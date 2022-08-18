// Input forms with rules:
//   {
//     "pluralRule-count-one": "i = 1 and v = 0 @integer 1",
//     "pluralRule-count-other": " @integer 0, 2~16, 100, 1000, 10000, 100000, 1000000, …
//       @decimal 0.0~1.5, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"
//   }
// Output rules, an array of distinct strings:
//   [
//     "i = 1 and v = 0 @integer 1",
//     " @integer 0, 2~16, 100, 1000, 10000, 100000, 1000000, …
//        @decimal 0.0~1.5, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …",
//     ...
//   ]
// Output forms, names pointing to array indexes of their rules:
//   {
//     "one": 0,
//     "other": 1
//   }
function indexPluralForms (forms, rules) {
  // Iterate over all plural forms.
  return Object
    .keys(forms)
    .reduce((result, formName) => {
      // Refer to plural rules in the de-duplication array.
      let rule = forms[formName]
      if (typeof rule === 'string') {
        rule = rule
          .trim()
          .replace(/ {2}/g, ' ')
        let ruleIndex = rules.indexOf(rule)
        if (ruleIndex < 0) {
          ruleIndex = rules.length
          rules.push(rule)
        }
        rule = ruleIndex
      }
      // Cut off prefixes "pluralRule-count- from plural forms.
      if (formName.length > 17) {
        formName = formName.substr(17)
      }
      result[formName] = rule
      return result
    }, {})
}

// Input forms, names pointing to array indexes of their rules:
//   {
//     "one": 0,
//     "other": 1
//   }
// Output string with the object serialized:
//   "one:0,other:1"
function stringifyForms (indexedForms) {
  return Object
    .keys(indexedForms)
    .map(formName => formName + ':' + indexedForms[formName])
    .join(',')
}

// Input forms with rules:
//   {
//     "pluralRule-count-one": "i = 1 and v = 0 @integer 1",
//     "pluralRule-count-other": " @integer 0, 2~16, 100, 1000, 10000, 100000, 1000000, …
//       @decimal 0.0~1.5, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …"
//   }
// Output rules, an array of distinct strings:
//   [
//     "i = 1 and v = 0 @integer 1",
//     " @integer 0, 2~16, 100, 1000, 10000, 100000, 1000000, …
//        @decimal 0.0~1.5, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0, …",
//     ...
//   ]
// Output forms, names pointing to array indexes of their rules:
//   "one:0,other:1"
function packPluralForms (forms, rules) {
  const indexedForms = indexPluralForms(forms, rules)
  return stringifyForms(indexedForms)
}

export { packPluralForms }
