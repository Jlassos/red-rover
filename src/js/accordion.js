// ----------------------------------------
// Accordion
// ----------------------------------------
$(function() {
  $('.rr.accordion .panel .title').each(function() {
    $(this).on('click', function() {
      $(this).parent('.rr.accordion .panel').toggleClass('active')
    })
  })
})
