/* faqs.js - FAQS page only: category chips, live search, expand/collapse all and topic shortcuts.
   The open/close behaviour of each question comes from the shared accordion in components.js. */
(function () {
  'use strict';

  var list = document.querySelector('[data-fq-list]');
  if (!list) { return; }

  var items = Array.prototype.slice.call(list.querySelectorAll('.fq-item'));
  var chips = Array.prototype.slice.call(document.querySelectorAll('.chip[data-cat]'));
  var input = document.getElementById('faqSearch');
  var count = document.querySelector('[data-fq-count]');
  var empty = document.querySelector('[data-fq-empty]');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var acc = window.siteAccordion;
  var cat = 'all';

  var haystacks = items.map(function (it) { return it.textContent.toLowerCase(); });

  function apply() {
    var tokens = (input ? input.value : '').trim().toLowerCase().split(/\s+/).filter(Boolean);
    var shown = 0;
    items.forEach(function (it, i) {
      var okCat = cat === 'all' || it.getAttribute('data-cat') === cat;
      var okText = tokens.every(function (t) { return haystacks[i].indexOf(t) !== -1; });
      var ok = okCat && okText;
      it.classList.toggle('is-hidden', !ok);
      if (ok) { shown++; }
    });
    if (count) { count.textContent = 'Showing ' + shown + ' question' + (shown === 1 ? '' : 's'); }
    if (empty) { empty.hidden = shown !== 0; }
  }

  function setCat(next) {
    cat = next;
    chips.forEach(function (c) { c.setAttribute('aria-pressed', c.getAttribute('data-cat') === cat ? 'true' : 'false'); });
    apply();
  }

  chips.forEach(function (c) { c.addEventListener('click', function () { setCat(c.getAttribute('data-cat')); }); });
  if (input) { input.addEventListener('input', apply); }

  function visibleItems() { return items.filter(function (it) { return !it.classList.contains('is-hidden'); }); }
  var expand = document.querySelector('[data-fq-expand]');
  var collapse = document.querySelector('[data-fq-collapse]');
  if (expand && acc) { expand.addEventListener('click', function () { visibleItems().forEach(function (it) { acc.setOpen(it, true); }); }); }
  if (collapse && acc) { collapse.addEventListener('click', function () { items.forEach(function (it) { acc.setOpen(it, false); }); }); }

  /* topic cards jump to a category */
  Array.prototype.forEach.call(document.querySelectorAll('[data-fq-filter]'), function (b) {
    b.addEventListener('click', function () {
      setCat(b.getAttribute('data-fq-filter'));
      var target = document.getElementById('questions');
      if (target) { target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' }); }
    });
  });

  /* faqs.html#pricing opens that category */
  var hash = (location.hash || '').replace('#', '');
  if (hash && chips.some(function (c) { return c.getAttribute('data-cat') === hash; })) { setCat(hash); }
})();
