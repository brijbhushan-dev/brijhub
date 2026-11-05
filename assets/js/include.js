/* include.js - injects the common header and footer into
   <div data-include="header"></div> / <div data-include="footer"></div>,
   then starts their behaviour and AOS. No fetch, so it works from file:// too.
   Load order on every page:
   aos.js -> search-index.js -> header-markup.js -> footer-markup.js -> include.js */
(function () {
  'use strict';

  var parts = [
    { name: 'header', html: window.SITE_HEADER_HTML, script: 'assets/js/header.js' },
    { name: 'footer', html: window.SITE_FOOTER_HTML, script: 'assets/js/footer.js' }
  ];

  var scripts = [];
  parts.forEach(function (p) {
    var slot = document.querySelector('[data-include="' + p.name + '"]');
    if (slot && p.html) {
      slot.outerHTML = p.html;
      scripts.push(p.script);
    }
  });

  var year = document.getElementById('footerYear');
  if (year) { year.textContent = new Date().getFullYear(); }

  function load(i) {
    if (i >= scripts.length) {
      if (window.AOS) { window.AOS.init({ duration: 700, easing: 'ease-out', once: true, offset: 80 }); }
      return;
    }
    var s = document.createElement('script');
    s.src = scripts[i];
    s.onload = s.onerror = function () { load(i + 1); };
    document.body.appendChild(s);
  }
  load(0);
})();
