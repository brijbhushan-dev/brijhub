/* blog.js - BLOG page only: topic chips, live search, tag shortcuts and "load more".
   The newsletter form is handled by the shared [data-form] helper in components.js. */
(function () {
  'use strict';

  var grid = document.querySelector('[data-bl-grid]');
  if (!grid) { return; }

  var cards = Array.prototype.slice.call(grid.querySelectorAll('.bl-card'));
  var chips = Array.prototype.slice.call(document.querySelectorAll('.chip[data-cat]'));
  var input = document.getElementById('blogSearch');
  var count = document.querySelector('[data-bl-count]');
  var empty = document.querySelector('[data-bl-empty]');
  var moreWrap = document.querySelector('.bl-more');
  var moreBtn = document.querySelector('[data-bl-more]');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var PAGE = 6;
  var cat = 'all';
  var limit = PAGE;

  var haystacks = cards.map(function (c) { return (c.textContent + ' ' + (c.getAttribute('data-tags') || '') + ' ' + c.getAttribute('data-cat')).toLowerCase(); });

  function apply() {
    var tokens = (input ? input.value : '').trim().toLowerCase().split(/\s+/).filter(Boolean);
    var filtering = cat !== 'all' || tokens.length > 0;
    var matches = 0, shown = 0;

    cards.forEach(function (c, i) {
      var ok = (cat === 'all' || c.getAttribute('data-cat') === cat) &&
        tokens.every(function (t) { return haystacks[i].indexOf(t) !== -1; });
      if (ok) { matches++; }
      var visible = ok && (filtering || matches <= limit);
      c.classList.toggle('is-hidden', !visible);
      if (visible) { shown++; }
    });

    if (count) { count.textContent = 'Showing ' + shown + ' of ' + (filtering ? matches : cards.length) + ' article' + (cards.length === 1 ? '' : 's'); }
    if (empty) { empty.hidden = matches !== 0; }
    if (moreWrap) { moreWrap.hidden = filtering || shown >= cards.length; }
    if (window.AOS && window.AOS.refresh) { window.setTimeout(window.AOS.refresh, 50); }   /* newly shown cards animate in */
  }

  function setCat(next) {
    cat = next;
    chips.forEach(function (c) { c.setAttribute('aria-pressed', c.getAttribute('data-cat') === cat ? 'true' : 'false'); });
    apply();
  }

  chips.forEach(function (c) { c.addEventListener('click', function () { setCat(c.getAttribute('data-cat')); }); });
  if (input) { input.addEventListener('input', apply); }
  if (moreBtn) { moreBtn.addEventListener('click', function () { limit = cards.length; apply(); }); }

  /* topic tags search the grid */
  Array.prototype.forEach.call(document.querySelectorAll('[data-bl-tag]'), function (b) {
    b.addEventListener('click', function () {
      if (input) { input.value = b.getAttribute('data-bl-tag'); }
      setCat('all');
      var target = document.getElementById('articles');
      if (target) { target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' }); }
    });
  });

  apply();
})();
