// ----------------------------------------
// Docs
// ----------------------------------------
$(function() {
  var examples = document.querySelectorAll('.docs-example')
  var htmlBeautifyOptions = {
    indent_size: 2,
    unformatted: [], // format all elements
  }

  // add code snippet
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

  // add anchor links
  anchors.add('.docs-example-title, .docs-example-header')

  // generate menu from anchors
  var docsMenu = document.querySelector('.docs-menu')
  anchors.elements.forEach(function(anchor) {
    var menuItem = document.createElement('a')
    if (anchor.className === 'docs-example-title') menuItem.className = 'item'
    if (anchor.className === 'docs-example-header')  menuItem.className = 'sub item'
    menuItem.href = '#' + anchor.id
    menuItem.textContent = anchor.textContent

    docsMenu.appendChild(menuItem)
  })
})
