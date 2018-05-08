$(document).ready(() => {
  !('ontouchstart' in window) && $('body').addClass('no-touch');
  require('./ripple');
  require('./scrollableHeader');
});
