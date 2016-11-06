// ----------------------------------------
// Docs
// ----------------------------------------
$(function() {
  // insert code snippet after each content div for example
  var examples = document.querySelectorAll('.docs-example')
  var htmlBeautifyOptions = {
    indent_size: 2,
    unformatted: [], // format all elements
  }

  examples.forEach(function(example) {
    var contents = example.querySelectorAll('.docs-example-content')

    contents.forEach(function(content) {
      var pre = document.createElement('pre')
      var code = document.createElement('code')
      var html = content.innerHTML

      code.textContent = html_beautify(html, htmlBeautifyOptions)
      pre.appendChild(code)
      $(content).after(pre)
      hljs.highlightBlock(pre)
    })
  })
})
