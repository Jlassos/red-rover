// ----------------------------------------
// Accordion
// ----------------------------------------
jQuery(function() {
  var $titles = jQuery('.rr.accordion .panel .title')
  console.log($titles)

  var handleTitleClick = function() {
    var $this = jQuery(this)
    var $panel = $this.closest('.panel')
    var isActive = $panel.is('.active')

    $panel.toggleClass('active', !isActive)
  }

  $titles.on('click', handleTitleClick)
})