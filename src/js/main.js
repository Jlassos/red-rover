// ----------------------------------------
// Docs
// ----------------------------------------
;(function() {
  'use strict'

  // insert code snippet after each example
  var examples = document.querySelectorAll('.docs-example')
  var htmlBeautifyOptions = {
    indent_size: 2,
    unformatted: [], // format all elements
  }

  examples.forEach(function(example) {
    var pre = document.createElement('pre')
    var code = document.createElement('code')
    var html = example.querySelector('.docs-example-content').innerHTML

    code.textContent = html_beautify(html, htmlBeautifyOptions)
    pre.appendChild(code)
    example.appendChild(pre)
    hljs.highlightBlock(pre)
  })
}())
