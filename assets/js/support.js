/* support.js - shared by the HELP & SUPPORT pages: knowledge-base search and filter,
   preferred-time chips (booking), star rating (feedback) and the earliest booking date.
   Form validation and success messages come from the shared [data-form] helper in components.js. */
(function () {
  'use strict';


  /* ---------- Knowledge base: category chips + live search ---------- */
  var kbList = document.querySelector('[data-kb-list]');
  if (kbList) {
    var items = Array.prototype.slice.call(kbList.querySelectorAll('.kb-item'));
    var chips = Array.prototype.slice.call(document.querySelectorAll('.chip[data-cat]'));
    var input = document.getElementById('kbSearch');
    var count = document.querySelector('[data-kb-count]');
    var empty = document.querySelector('[data-kb-empty]');
    var cat = 'all';
    var hay = items.map(function (it) { return it.textContent.toLowerCase(); });

    var apply = function () {
      var tokens = (input ? input.value : '').trim().toLowerCase().split(/\s+/).filter(Boolean);
      var shown = 0;
      items.forEach(function (it, i) {
        var ok = (cat === 'all' || it.getAttribute('data-cat') === cat) &&
          tokens.every(function (t) { return hay[i].indexOf(t) !== -1; });
        it.classList.toggle('is-hidden', !ok);
        if (ok) { shown++; }
      });
      if (count) { count.textContent = 'Showing ' + shown + ' guide' + (shown === 1 ? '' : 's'); }
      if (empty) { empty.hidden = shown !== 0; }
    };
    var setCat = function (next) {
      cat = next;
      chips.forEach(function (c) { c.setAttribute('aria-pressed', c.getAttribute('data-cat') === cat ? 'true' : 'false'); });
      apply();
    };
    chips.forEach(function (c) { c.addEventListener('click', function () { setCat(c.getAttribute('data-cat')); }); });
    if (input) { input.addEventListener('input', apply); }

    var hash = (location.hash || '').replace('#', '');
    if (hash && chips.some(function (c) { return c.getAttribute('data-cat') === hash; })) { setCat(hash); }
  }

  /* ---------- Preferred time chips (booking) ---------- */
  Array.prototype.forEach.call(document.querySelectorAll('[data-slots]'), function (group) {
    var hidden = document.getElementById(group.getAttribute('data-slots'));
    var buttons = Array.prototype.slice.call(group.querySelectorAll('[data-slot]'));
    buttons.forEach(function (b) {
      b.addEventListener('click', function () {
        buttons.forEach(function (o) { o.setAttribute('aria-pressed', o === b ? 'true' : 'false'); });
        hidden.value = b.getAttribute('data-slot');
        hidden.dispatchEvent(new Event('input', { bubbles: true }));
        var err = document.getElementById(hidden.id + '-err');
        if (err) { err.hidden = true; err.textContent = ''; }
      });
    });
    var form = group.closest('form');
    if (form) { form.addEventListener('reset', function () { buttons.forEach(function (o) { o.setAttribute('aria-pressed', 'false'); }); }); }
  });

  /* ---------- Star rating (feedback) ---------- */
  Array.prototype.forEach.call(document.querySelectorAll('[data-stars]'), function (group) {
    var hidden = document.getElementById(group.getAttribute('data-stars'));
    var stars = Array.prototype.slice.call(group.querySelectorAll('[data-star]'));
    function paint(n) {
      stars.forEach(function (s, i) {
        s.classList.toggle('is-on', i < n);
        s.setAttribute('aria-pressed', i + 1 === n ? 'true' : 'false');
      });
    }
    stars.forEach(function (s) {
      s.addEventListener('click', function () {
        var n = parseInt(s.getAttribute('data-star'), 10);
        hidden.value = String(n);
        paint(n);
      });
    });
    var form = group.closest('form');
    if (form) { form.addEventListener('reset', function () { hidden.value = ''; paint(0); }); }
  });

  /* ---------- Earliest booking date = today ---------- */
  Array.prototype.forEach.call(document.querySelectorAll('input[type="date"][data-min-today]'), function (d) {
    var t = new Date();
    var m = String(t.getMonth() + 1).padStart(2, '0');
    var day = String(t.getDate()).padStart(2, '0');
    d.min = t.getFullYear() + '-' + m + '-' + day;
  });

})();
