'use strict';

(function() {
  // insert code snippet after each example
  var examples = document.querySelectorAll('.rr-example')
  var htmlBeautifyOptions = {
    indent_size: 2,
    unformatted: [], // format all elements
  }

  examples.forEach((example) => {
    var pre = document.createElement('pre')
    var code = document.createElement('code')
    var html = example.querySelector('.content').innerHTML

    code.textContent = html_beautify(html, htmlBeautifyOptions)
    pre.appendChild(code)
    example.appendChild(pre)
    hljs.highlightBlock(pre)
  })
}())
