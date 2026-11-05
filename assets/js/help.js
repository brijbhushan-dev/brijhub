/* help.js - HELP page only: live search over the topic cards and popular articles. */
(function () {
  'use strict';

  var input = document.getElementById('helpSearch');
  if (!input) { return; }

  var items = Array.prototype.slice.call(document.querySelectorAll('[data-help-item]'));
  var empty = document.querySelector('[data-help-empty]');
  var status = document.querySelector('[data-help-status]');
  var defaultText = status ? status.textContent : '';

  function text(el) { return (el.textContent + ' ' + (el.getAttribute('data-keywords') || '')).toLowerCase(); }
  var haystacks = items.map(text);

  function run() {
    var tokens = input.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
    var shown = 0;
    items.forEach(function (el, i) {
      var ok = tokens.every(function (t) { return haystacks[i].indexOf(t) !== -1; });
      el.classList.toggle('is-hidden', !ok);
      if (ok) { shown++; }
    });
    if (empty) { empty.hidden = shown !== 0; }
    if (status) {
      status.textContent = tokens.length
        ? (shown ? shown + ' result' + (shown === 1 ? '' : 's') + ' for "' + input.value.trim() + '"' : 'No results found')
        : defaultText;
    }
    if (window.AOS && window.AOS.refresh) { window.setTimeout(window.AOS.refresh, 50); }   /* re-measure cards that were hidden */
  }

  input.addEventListener('input', run);

  Array.prototype.forEach.call(document.querySelectorAll('[data-help-tag]'), function (b) {
    b.addEventListener('click', function () {
      input.value = b.getAttribute('data-help-tag');
      run();
      var grid = document.getElementById('topics');
      if (grid) { grid.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' }); }
    });
  });
})();
