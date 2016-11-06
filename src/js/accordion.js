// ----------------------------------------
// Accordion
// ----------------------------------------
$(function() {
  var $titles = $('.rr.accordion .panel .title')

  var handleTitleClick = function() {
    var $this = $(this)
    var $panel = $this.closest('.panel')
    var isActive = $panel.is('.active')

    $panel.toggleClass('active', !isActive)
  }

  $titles.on('click', handleTitleClick)
})
