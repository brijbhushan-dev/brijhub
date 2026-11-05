/* about.js - ABOUT page only: hero mouse-parallax, journey timeline progress and skill bars. */

/* ---------- Hero: layers drift with the mouse (data-depth) ---------- */
(function () {
  'use strict';

  var hero = document.getElementById('hero');
  if (!hero) { return; }
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { return; }
  if (!window.matchMedia('(hover: hover)').matches) { return; }

  var layers = Array.prototype.slice.call(hero.querySelectorAll('[data-depth]'));
  var raf = 0, tx = 0, ty = 0;

  function apply() {
    layers.forEach(function (el) {
      var d = parseFloat(el.getAttribute('data-depth'));
      el.style.translate = (tx * d).toFixed(1) + 'px ' + (ty * d).toFixed(1) + 'px';
    });
    raf = 0;
  }

  hero.addEventListener('pointermove', function (e) {
    var r = hero.getBoundingClientRect();
    tx = (e.clientX - r.left) / r.width - 0.5;      /* -0.5 .. 0.5 */
    ty = (e.clientY - r.top) / r.height - 0.5;
    if (!raf) { raf = window.requestAnimationFrame(apply); }
  });
  hero.addEventListener('pointerleave', function () {
    tx = 0; ty = 0;
    if (!raf) { raf = window.requestAnimationFrame(apply); }
  });
})();

/* ---------- Journey timeline: the line fills as you scroll, cards light up ---------- */
(function () {
  'use strict';

  var tl = document.querySelector('[data-timeline]');
  if (!tl) { return; }

  var items = Array.prototype.slice.call(tl.querySelectorAll('.tl__item'));
  var ticking = false;

  function update() {
    var vh = window.innerHeight;
    var focus = vh * 0.55;                                     /* the "reading line" */
    var r = tl.getBoundingClientRect();
    var p = (focus - r.top) / r.height;
    tl.style.setProperty('--tl-progress', Math.max(0, Math.min(1, p)) * 100 + '%');
    items.forEach(function (it) {
      it.classList.toggle('is-reached', it.getBoundingClientRect().top + 40 < focus);
    });
    ticking = false;
  }
  function request() { if (!ticking) { window.requestAnimationFrame(update); ticking = true; } }

  window.addEventListener('scroll', request, { passive: true });
  window.addEventListener('resize', request);
  window.addEventListener('load', request);
  request();
})();

/* ---------- Skill bars fill when they scroll into view ---------- */
(function () {
  'use strict';

  var lists = document.querySelectorAll('[data-skills]');
  if (!lists.length) { return; }

  if (!('IntersectionObserver' in window)) {
    Array.prototype.forEach.call(lists, function (l) { l.classList.add('is-in'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.35 });
  Array.prototype.forEach.call(lists, function (l) { io.observe(l); });
})();
