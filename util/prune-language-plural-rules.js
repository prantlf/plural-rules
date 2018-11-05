/*
<style>
  html, body, table {
    width: 100%;
  }
</style>
<table class="dtf-table" border="1">
<script src="prune-language-plural-rules.js"></script>
*/
;(function () {
  'use strict'

  console.log('Deleting last column')
  const table = document.querySelector('table > tbody')
  let cells = table.querySelectorAll('tr > *:last-child')
  for (let cell of cells) {
    cell.parentNode.removeChild(cell)
  }
  console.log('Deleting one-but-last column')
  cells = table.querySelectorAll('tr > *:last-child')
  for (let cell of cells) {
    cell.parentNode.removeChild(cell)
  }
  console.log('Deleting one-but-last column')
  cells = table.querySelectorAll('tr > *:nth-child(3)')
  for (let cell of cells) {
    cell.parentNode.removeChild(cell)
  }
  console.log('Deleting ordinal and range data')
  let rows = table.querySelectorAll('tr')
  let start, name
  let count = 0
  for (const row of rows) {
    const cell = row.querySelector('*:first-child')
    if (cell.textContent === 'Name') {
      console.log(' New language:')
      start = null
      name = null
      continue
    }
    if (cell.textContent === 'Bihari' ||
        cell.textContent === 'Moldavian' || // ro_MD
        cell.textContent === 'Norwegian' || // nb
        cell.textContent === 'Serbo-Croatian' || // sr_Latn
        cell.textContent === 'Tagalog') { // fil
        // Yiddish ji <-- yi
      row.parentNode.removeChild(row)
      continue
    }
    if (/^[A-Z]/.test(cell.textContent)) {
      console.log(' ', cell.textContent)
      start = cell
      name = cell.textContent
      continue
    }
    if (count > 0) {
      --count
      console.log('   Continuing, pending', count)
      row.parentNode.removeChild(row)
      continue
    }
    if (cell.textContent === 'ordinal' || cell.textContent === 'range') {
      let rowspan = cell.getAttribute('rowspan')
      if (rowspan) {
        count = +rowspan - 1
        console.log('  Deleting', cell.textContent, 'with extra', count)
      }
      row.parentNode.removeChild(row)
      rowspan = start.getAttribute('rowspan')
      rowspan = +rowspan - count - 1
      if (rowspan > 1) {
        start.setAttribute('rowspan', rowspan.toString())
      } else {
        start.removeAttribute('rowspan')
      }
      const code = start.parentNode.querySelector('*:nth-child(2)')
      rowspan = code.getAttribute('rowspan')
      rowspan = +rowspan - count - 1
      if (rowspan > 1) {
        code.setAttribute('rowspan', rowspan.toString())
      } else {
        code.removeAttribute('rowspan')
      }
      continue
    }
    if (cell.textContent === 'iw' && name === 'Hebrew' ||
        cell.textContent === 'in' && name === 'Indonesian' ||
        cell.textContent === 'jw' && name === 'Javanese') {
continue
      console.log('  Deleting rogue row')
      row.parentNode.removeChild(row)
      let rowspan = start.getAttribute('rowspan')
      rowspan = +rowspan - 1
      if (rowspan > 1) {
        start.setAttribute('rowspan', rowspan.toString())
      } else {
        start.removeAttribute('rowspan')
      }
      const code = start.parentNode.querySelector('*:nth-child(2)')
      rowspan = code.getAttribute('rowspan')
      rowspan = +rowspan - 1
      if (rowspan > 1) {
        code.setAttribute('rowspan', rowspan.toString())
      } else {
        code.removeAttribute('rowspan')
      }
    }
  }
  console.log('Deleting row headers')
  rows = table.querySelectorAll('tr')
  for (const row of rows) {
    const cell = row.querySelector('*:first-child')
    if (cell.textContent === 'Name') {
      row.parentNode.removeChild(row)
    }
  }
  console.log('Replacing links')
  const links = table.querySelectorAll('a')
  for (const link of links) {
    const cell = link.parentNode
    const text = document.createTextNode(link.textContent)
    cell.removeChild(link)
    cell.appendChild(text)
  }
}())
