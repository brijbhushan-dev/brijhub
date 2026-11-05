/* legal.js - shared by the six LEGAL pages: smooth jump from the left menu,
   scroll-spy that highlights the section you are reading, reading progress and print. */
(function () {
  'use strict';

  var nav = document.querySelector('[data-lg-nav]');
  var list = nav ? nav.querySelector('.lg-nav__list') : null;
  var links = nav ? Array.prototype.slice.call(nav.querySelectorAll('.lg-nav__link')) : [];
  var content = document.querySelector('[data-lg-content]');
  var sections = content ? Array.prototype.slice.call(content.querySelectorAll('.lg-sec')) : [];
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* print button */
  Array.prototype.forEach.call(document.querySelectorAll('[data-lg-print]'), function (b) {
    b.addEventListener('click', function () { window.print(); });
  });

  if (!links.length || !sections.length) { return; }

  var current = null;

  function setActive(id) {
    if (id === current) { return; }
    current = id;
    links.forEach(function (a) {
      var on = a.getAttribute('href') === '#' + id;
      a.classList.toggle('is-active', on);
      if (on) { a.setAttribute('aria-current', 'true'); } else { a.removeAttribute('aria-current'); }
      if (on && list) {                                    /* keep the active item visible inside the menu */
        var top = a.offsetTop, bottom = top + a.offsetHeight;
        if (top < list.scrollTop + 8) { list.scrollTop = top - 8; }
        else if (bottom > list.scrollTop + list.clientHeight - 8) { list.scrollTop = bottom - list.clientHeight + 8; }
      }
    });
  }

  /* click: scroll the right-hand content to that section */
  links.forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href').slice(1);
      var target = document.getElementById(id);
      if (!target) { return; }
      e.preventDefault();
      target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
      if (window.history && history.replaceState) { history.replaceState(null, '', '#' + id); }
      setActive(id);
    });
  });

  /* scroll-spy + progress */
  var ticking = false;
  function update() {
    var line = 150;                                         /* just under the sticky header */
    var active = sections[0].id;
    sections.forEach(function (s) { if (s.getBoundingClientRect().top <= line) { active = s.id; } });
    var atBottom = window.innerHeight + window.pageYOffset >= document.documentElement.scrollHeight - 4;
    if (atBottom) { active = sections[sections.length - 1].id; }
    setActive(active);

    var r = content.getBoundingClientRect();
    var p = (line - r.top) / (r.height - (window.innerHeight - line));
    if (nav) { nav.style.setProperty('--lg-progress', Math.max(0, Math.min(1, p)) * 100 + '%'); }
    ticking = false;
  }
  function request() { if (!ticking) { window.requestAnimationFrame(update); ticking = true; } }

  window.addEventListener('scroll', request, { passive: true });
  window.addEventListener('resize', request);
  window.addEventListener('load', function () {
    var hash = (location.hash || '').slice(1);              /* opening page.html#section jumps to it */
    var t = hash && document.getElementById(hash);
    if (t) { t.scrollIntoView(); }
    request();
  });
  request();
})();
