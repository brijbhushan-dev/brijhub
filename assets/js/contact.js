/* contact.js - CONTACT page only: office cards light up the matching map pin.
   The form itself is handled by the shared [data-form] helper in components.js. */
(function () {
  'use strict';

  var offices = document.querySelectorAll('[data-office]');
  if (!offices.length) { return; }

  function pin(n) { return document.querySelector('[data-pin="' + n + '"]'); }

  Array.prototype.forEach.call(offices, function (o) {
    var n = o.getAttribute('data-office');
    function on() { o.classList.add('is-active'); var p = pin(n); if (p) { p.classList.add('is-active'); } }
    function off() { o.classList.remove('is-active'); var p = pin(n); if (p) { p.classList.remove('is-active'); } }
    o.addEventListener('mouseenter', on);
    o.addEventListener('mouseleave', off);
    o.addEventListener('focusin', on);
    o.addEventListener('focusout', off);
  });
})();
