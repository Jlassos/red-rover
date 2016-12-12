// ----------------------------------------
// Docs
// ----------------------------------------
$(function() {
  var $examples = $('.docs.example')
  var htmlBeautifyOptions = {
    indent_size: 2,
    unformatted: [], // format all elements
  }

  // add code snippet
  $examples.each(function() {
    var $contents = $(this).children('.content')

    $contents.each(function() {
      var pre = document.createElement('pre')
      var code = document.createElement('code')
      var html = this.innerHTML

      code.textContent = html_beautify(html, htmlBeautifyOptions)
      pre.appendChild(code)
      $(this).after(pre)
      hljs.highlightBlock(pre)
    })
  })

  // add anchor links
  anchors.add('.docs.example > .title, .docs.example > .header')

  // generate menu from anchors
  var $docsMenu = $('.docs.menu')
  anchors.elements.forEach(function(anchor) {
    var menuItem = document.createElement('a')
    if (anchor.className === 'title') menuItem.className = 'item'
    if (anchor.className === 'header') menuItem.className = 'sub item'
    menuItem.href = '#' + anchor.id
    menuItem.textContent = anchor.textContent

    $docsMenu.append(menuItem)
  })
})
