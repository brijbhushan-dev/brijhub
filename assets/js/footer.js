/* footer.js - back-to-top button: show after scroll, progress ring, smooth scroll */
(function () {
  'use strict';

  var btn = document.getElementById('backToTop');
  if (!btn) { return; }

  var bar = btn.querySelector('.back-to-top__bar');
  var CIRCUMFERENCE = 150.8;           // 2 * PI * r (r = 24)
  var SHOW_AFTER = 300;                // px scrolled before the button appears
  var ticking = false;

  function update() {
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    var max = document.documentElement.scrollHeight - window.innerHeight;
    var progress = max > 0 ? Math.min(scrollTop / max, 1) : 0;

    btn.classList.toggle('is-visible', scrollTop > SHOW_AFTER);
    if (bar) { bar.style.strokeDashoffset = String(CIRCUMFERENCE * (1 - progress)); }
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });

  btn.addEventListener('click', function () {
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    btn.classList.add('is-launching');
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    window.setTimeout(function () { btn.classList.remove('is-launching'); }, 900);
  });

  update();
})();

/* Footer link columns: accordion on mobile (<768px), always open on desktop */
(function () {
  'use strict';

  var toggles = document.querySelectorAll('.site-footer__toggle');
  if (!toggles.length) { return; }

  var mq = window.matchMedia('(max-width: 767.98px)');

  function setOpen(toggle, open) {
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.closest('.site-footer__col').classList.toggle('is-open', open);
  }

  function syncMode() {
    Array.prototype.forEach.call(toggles, function (t) {
      setOpen(t, false);
      if (mq.matches) {
        t.removeAttribute('disabled');
      } else {
        t.setAttribute('disabled', '');   /* plain heading on desktop */
        t.removeAttribute('aria-expanded');
      }
    });
  }

  Array.prototype.forEach.call(toggles, function (t) {
    t.addEventListener('click', function () {
      if (!mq.matches) { return; }
      var willOpen = t.getAttribute('aria-expanded') !== 'true';
      Array.prototype.forEach.call(toggles, function (o) { setOpen(o, false); });
      setOpen(t, willOpen);
    });
  });

  if (mq.addEventListener) { mq.addEventListener('change', syncMode); } else { mq.addListener(syncMode); }
  syncMode();
})();
