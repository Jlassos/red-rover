// ----------------------------------------
// Toggle
// ----------------------------------------
$(function() {
  var $toggles = $('.rr.toggle')

  // init
  var setState = function setState(node, toggle) {
    var $toggle = $(node)

    // update class
    if (toggle) $toggle.toggleClass('active')

    // update input
    $toggle
      .find('input[type="checkbox"]')
      .prop('checked', $toggle.is('.active'))
  }

  // init
  $toggles.each(function() {
    setState(this)
  })

  // handle clicks
  $toggles.on('click', function(e) {
    setState(this, true)
  })
})
