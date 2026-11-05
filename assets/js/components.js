/* components.js - behaviour shared by more than one page: count-up numbers and parallax.
   Load it on every page that uses [data-count] or [data-parallax]. */

/* ---------- Count-up numbers (Stats section) ---------- */
(function () {
  'use strict';

  var nums = Array.prototype.slice.call(document.querySelectorAll('[data-count]'));
  if (!nums.length) { return; }

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !('IntersectionObserver' in window)) { return; }   /* final numbers are already in the HTML */

  function fmt(v, d) { return d ? v.toFixed(d) : String(Math.round(v)); }

  function run(el) {
    var end = parseFloat(el.getAttribute('data-count'));
    var d = parseInt(el.getAttribute('data-decimals') || '0', 10);
    var dur = 1900;
    var t0 = null;
    function step(t) {
      if (t0 === null) { t0 = t; }
      var p = Math.min((t - t0) / dur, 1);
      el.textContent = fmt(end * (1 - Math.pow(1 - p, 3)), d);
      if (p < 1) { window.requestAnimationFrame(step); }
    }
    window.requestAnimationFrame(step);
    window.setTimeout(function () { el.textContent = fmt(end, d); }, dur + 500);   /* safety net */
  }

  nums.forEach(function (el) { el.textContent = fmt(0, parseInt(el.getAttribute('data-decimals') || '0', 10)); });

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { run(e.target); io.unobserve(e.target); }
    });
  }, { threshold: 0.4 });
  nums.forEach(function (el) { io.observe(el); });
})();


/* ---------- Parallax: elements marked data-parallax="speed" drift while scrolling ----------
   speed > 0: moves with the page more slowly; speed < 0: opposite direction. */
(function () {
  'use strict';

  var items = Array.prototype.slice.call(document.querySelectorAll('[data-parallax]'));
  if (!items.length) { return; }
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { return; }

  var visible = [];
  var ticking = false;

  function update() {
    var vh = window.innerHeight;
    var k = window.innerWidth < 768 ? 0.6 : 1;           /* gentler on phones */
    visible.forEach(function (el) {
      var r = el.getBoundingClientRect();
      var base = r.top + r.height / 2 - (el._py || 0);   /* position without our own shift */
      var y = (base - vh / 2) * parseFloat(el.getAttribute('data-parallax')) * k;
      el._py = y;
      el.style.translate = '0 ' + y.toFixed(1) + 'px';
    });
    ticking = false;
  }

  function request() {
    if (!ticking) { window.requestAnimationFrame(update); ticking = true; }
  }

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        var i = visible.indexOf(e.target);
        if (e.isIntersecting && i === -1) { visible.push(e.target); }
        else if (!e.isIntersecting && i !== -1) { visible.splice(i, 1); }
      });
      request();
    }, { rootMargin: '250px 0px' });
    items.forEach(function (el) { io.observe(el); });
  } else {
    visible = items;
  }

  window.addEventListener('scroll', request, { passive: true });
  window.addEventListener('resize', request);
  window.addEventListener('load', request);
  request();
})();

/* ---------- FAQ accordion (one open at a time). Pages can call window.siteAccordion.setOpen(item, bool). ---------- */
(function () {
  'use strict';

  function setOpen(item, open) {
    item.classList.toggle('is-open', open);
    var q = item.querySelector('.faq__q');
    if (q) { q.setAttribute('aria-expanded', open ? 'true' : 'false'); }
  }
  window.siteAccordion = { setOpen: setOpen };

  Array.prototype.forEach.call(document.querySelectorAll('[data-faq]'), function (list) {
    var multi = list.getAttribute('data-faq') === 'multi';
    list.addEventListener('click', function (e) {
      var btn = e.target.closest('.faq__q');
      if (!btn || !list.contains(btn)) { return; }
      var item = btn.closest('.faq__item');
      var willOpen = !item.classList.contains('is-open');
      if (!multi) {
        Array.prototype.forEach.call(list.querySelectorAll('.faq__item.is-open'), function (o) { setOpen(o, false); });
      }
      setOpen(item, willOpen);
    });
  });
})();

/* ---------- Generic validated form: <form data-form> with fields marked data-rule ----------
   rules: required | email | phone | min:N | checked.  Error text goes to #<field id>-err.
   On success the element [data-form-success] (inside the form wrapper) is shown.
   Connect a real API in sendToServer(). */
(function () {
  'use strict';

  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function message(field) {
    var rules = (field.getAttribute('data-rule') || '').split(' ');
    var v = field.type === 'checkbox' ? '' : field.value.trim();
    for (var i = 0; i < rules.length; i++) {
      var r = rules[i];
      if (r === 'checked' && !field.checked) { return 'Please tick this box to continue.'; }
      if (r === 'required' && !v) { return 'This field is required.'; }
      if (r === 'email' && v && !EMAIL_RE.test(v)) { return 'Enter a valid email address.'; }
      if (r === 'phone' && v && !/^[+()\d][\d\s()+-]{6,}$/.test(v)) { return 'Enter a valid phone number.'; }
      if (r.indexOf('min:') === 0 && v && v.length < parseInt(r.slice(4), 10)) { return 'Please write at least ' + r.slice(4) + ' characters.'; }
    }
    return '';
  }

  function show(field, msg) {
    var err = document.getElementById(field.id + '-err');
    field.classList.toggle('is-invalid-custom', !!msg);
    if (msg) { field.setAttribute('aria-invalid', 'true'); if (err) { field.setAttribute('aria-describedby', err.id); } }
    else { field.removeAttribute('aria-invalid'); field.removeAttribute('aria-describedby'); }
    if (err) { err.textContent = msg; err.hidden = !msg; }
  }

  function sendToServer(form, data) {
    return new Promise(function (resolve) { window.setTimeout(function () { resolve({ ok: true, data: data }); }, 800); });
  }

  Array.prototype.forEach.call(document.querySelectorAll('form[data-form]'), function (form) {
    var fields = Array.prototype.slice.call(form.querySelectorAll('[data-rule]'));
    var box = form.parentElement.querySelector('[data-form-success]');
    var btn = form.querySelector('[type="submit"]');

    fields.forEach(function (f) {
      var recheck = function () { if (f.classList.contains('is-invalid-custom')) { show(f, message(f)); } };
      f.addEventListener('input', recheck);
      f.addEventListener('change', recheck);
      f.addEventListener('blur', function () { if (f.value || f.type === 'checkbox') { show(f, message(f)); } });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var first = null;
      fields.forEach(function (f) { var m = message(f); show(f, m); if (m && !first) { first = f; } });
      if (first) { first.focus(); return; }

      var data = {};
      fields.forEach(function (f) { data[f.name || f.id] = f.type === 'checkbox' ? f.checked : f.value; });
      if (btn) { btn.classList.add('is-loading'); }
      sendToServer(form, data).then(function () {
        if (btn) { btn.classList.remove('is-loading'); }
        form.reset();
        if (box) { box.hidden = false; box.setAttribute('tabindex', '-1'); box.focus(); }
      });
    });
  });
})();
