/* index.js - HOME page only: hero slider, particle network and scroll button. */
(function () {
  'use strict';

  var hero = document.getElementById('hero');
  if (!hero) { return; }

  var slides = Array.prototype.slice.call(hero.querySelectorAll('.hero__slide'));
  var dots = Array.prototype.slice.call(hero.querySelectorAll('.hero__dot'));
  var btnPrev = hero.querySelector('[data-hero-prev]');
  var btnNext = hero.querySelector('[data-hero-next]');
  var btnPause = hero.querySelector('[data-hero-pause]');
  var btnScroll = hero.querySelector('[data-hero-scroll]');
  var stage = hero.querySelector('.hero__slides');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var WIPE_MS = 1150;

  var current = 0;
  var busy = false;
  var userPaused = reduce;           /* with reduced motion the slider does not auto-play */
  var hoverPaused = false;
  var offscreen = false;
  var onVisibility = function () {};   /* the particle loop hooks in here */

  /* ---------- state helpers ---------- */
  function applyPause() {
    var paused = userPaused || hoverPaused || offscreen || document.hidden;
    hero.classList.toggle('is-paused', paused);
    hero.classList.toggle('is-static', reduce);
    stage.setAttribute('aria-live', paused ? 'polite' : 'off');
  }

  function setPauseButton() {
    if (!btnPause) { return; }
    btnPause.classList.toggle('is-off', userPaused);
    btnPause.setAttribute('aria-label', userPaused ? 'Play slideshow' : 'Pause slideshow');
  }

  function render() {
    dots.forEach(function (d, i) {
      if (i === current) { d.setAttribute('aria-current', 'true'); } else { d.removeAttribute('aria-current'); }
    });
    slides.forEach(function (s, i) { s.setAttribute('aria-hidden', i === current ? 'false' : 'true'); });
  }

  /* ---------- go to a slide ---------- */
  function goTo(index, dir) {
    var next = (index + slides.length) % slides.length;
    if (next === current || busy) { return; }
    busy = true;

    var old = slides[current];
    hero.setAttribute('data-dir', dir || (next > current ? 'next' : 'prev'));
    void hero.offsetWidth;                      /* commit the start position before animating */

    old.classList.remove('is-active');
    old.classList.add('is-leaving');
    slides[next].classList.add('is-active');
    current = next;
    render();

    window.setTimeout(function () {
      old.classList.remove('is-leaving');
      busy = false;
    }, reduce ? 0 : WIPE_MS);
  }

  function next() { goTo(current + 1, 'next'); }
  function prev() { goTo(current - 1, 'prev'); }

  /* ---------- autoplay: the progress bar finishing triggers the next slide ---------- */
  hero.addEventListener('animationend', function (e) {
    if (e.animationName === 'hero-progress' && !reduce) { next(); }
  });

  /* ---------- controls ---------- */
  if (btnNext) { btnNext.addEventListener('click', next); }
  if (btnPrev) { btnPrev.addEventListener('click', prev); }
  dots.forEach(function (d, i) { d.addEventListener('click', function () { goTo(i); }); });

  if (btnPause) {
    btnPause.addEventListener('click', function () {
      userPaused = !userPaused;
      setPauseButton();
      applyPause();
    });
  }

  hero.addEventListener('mouseenter', function () { hoverPaused = true; applyPause(); });
  hero.addEventListener('mouseleave', function () { hoverPaused = false; applyPause(); });
  hero.addEventListener('focusin', function () { hoverPaused = true; applyPause(); });
  hero.addEventListener('focusout', function () { hoverPaused = false; applyPause(); });
  document.addEventListener('visibilitychange', applyPause);

  hero.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') { next(); }
    else if (e.key === 'ArrowLeft') { prev(); }
  });

  /* ---------- swipe (touch / pen / mouse drag) ---------- */
  var startX = null;
  var startY = null;
  stage.style.touchAction = 'pan-y';
  stage.addEventListener('pointerdown', function (e) { startX = e.clientX; startY = e.clientY; });
  stage.addEventListener('pointerup', function (e) {
    if (startX === null) { return; }
    var dx = e.clientX - startX;
    var dy = e.clientY - startY;
    startX = null;
    if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.4) { if (dx < 0) { next(); } else { prev(); } }
  });
  stage.addEventListener('pointercancel', function () { startX = null; });

  /* ---------- pause while the hero is off-screen ---------- */
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      offscreen = !entries[0].isIntersecting;
      applyPause();
      onVisibility();
    }, { threshold: 0.2 }).observe(hero);
  }

  /* ---------- scroll button: go to whatever comes after the hero ---------- */
  if (btnScroll) {
    btnScroll.addEventListener('click', function () {
      var nav = document.querySelector('.site-header__nav');
      var navH = nav ? nav.offsetHeight : 80;
      var target = hero.nextElementSibling || (hero.parentElement && hero.parentElement.nextElementSibling);
      var top = target
        ? target.getBoundingClientRect().top + window.pageYOffset - navH
        : hero.getBoundingClientRect().bottom + window.pageYOffset - navH;
      window.scrollTo({ top: Math.max(top, 0), behavior: reduce ? 'auto' : 'smooth' });
    });
  }

  /* ---------- particle network (decorative) ---------- */
  var canvas = hero.querySelector('.hero__canvas');
  if (canvas && !reduce && canvas.getContext) {
    var ctx = canvas.getContext('2d');
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var w = 0, h = 0, dotsList = [], running = false, raf = 0;
    var mouse = { x: -999, y: -999 };

    var resize = function () {
      w = hero.clientWidth; h = hero.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var count = Math.max(22, Math.min(70, Math.round(w / 22)));
      dotsList = [];
      for (var i = 0; i < count; i++) {
        dotsList.push({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - .5) * .45, vy: (Math.random() - .5) * .45, r: Math.random() * 1.8 + .8, o: Math.random() < .12 });
      }
    };

    var frame = function () {
      ctx.clearRect(0, 0, w, h);
      var maxD = 130;
      for (var i = 0; i < dotsList.length; i++) {
        var p = dotsList[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) { p.vx *= -1; }
        if (p.y < 0 || p.y > h) { p.vy *= -1; }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, 6.2832);
        ctx.fillStyle = p.o ? 'rgba(255,122,0,.95)' : 'rgba(255,255,255,.75)';
        ctx.fill();
        for (var j = i + 1; j < dotsList.length; j++) {
          var q = dotsList[j];
          var dx = p.x - q.x, dy = p.y - q.y, d = Math.sqrt(dx * dx + dy * dy);
          if (d < maxD) {
            ctx.strokeStyle = 'rgba(191,227,255,' + (0.28 * (1 - d / maxD)) + ')';
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
          }
        }
        var mx = p.x - mouse.x, my = p.y - mouse.y, md = Math.sqrt(mx * mx + my * my);
        if (md < 170) {
          ctx.strokeStyle = 'rgba(255,122,0,' + (0.55 * (1 - md / 170)) + ')';
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
        }
      }
      raf = running ? window.requestAnimationFrame(frame) : 0;
    };

    var syncRun = function () {
      var should = !offscreen && !document.hidden;
      if (should && !running) { running = true; raf = window.requestAnimationFrame(frame); }
      else if (!should) { running = false; window.cancelAnimationFrame(raf); }
    };

    hero.addEventListener('pointermove', function (e) {
      var r = hero.getBoundingClientRect();
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
    });
    hero.addEventListener('pointerleave', function () { mouse.x = mouse.y = -999; });
    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', syncRun);
    onVisibility = syncRun;
    resize();
    syncRun();
  }

  /* load the other slide images once the first one is on screen, so changing slides never shows a blank frame */
  window.addEventListener('load', function () {
    Array.prototype.forEach.call(hero.querySelectorAll('img[loading="lazy"]'), function (img) { img.loading = 'eager'; });
  });

  render();
  setPauseButton();
  applyPause();
})();

/* ==========================================================================
   Home sections: count-up numbers, portfolio carousel, testimonial carousel
   and FAQ accordion. Each block runs only if its markup exists.
   ========================================================================== */

/* ---------- Portfolio carousel (scroll-snap + buttons + mouse drag) ---------- */
(function () {
  'use strict';

  var track = document.querySelector('[data-pf-track]');
  if (!track) { return; }

  var prev = document.querySelector('[data-pf-prev]');
  var next = document.querySelector('[data-pf-next]');
  var bar = document.querySelector('[data-pf-bar]');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function stepSize() {
    var c = track.querySelector('.pf__card');
    var gap = parseFloat(window.getComputedStyle(track).columnGap) || 24;
    return c ? c.getBoundingClientRect().width + gap : 320;
  }

  function update() {
    var max = track.scrollWidth - track.clientWidth;
    var x = track.scrollLeft;
    if (prev) { prev.disabled = x <= 2; }
    if (next) { next.disabled = x >= max - 2; }
    if (bar) { bar.style.setProperty('--p', (max > 0 ? 22 + (x / max) * 78 : 100) + '%'); }
  }

  function go(dir) { track.scrollBy({ left: dir * stepSize(), behavior: reduce ? 'auto' : 'smooth' }); }
  if (prev) { prev.addEventListener('click', function () { go(-1); }); }
  if (next) { next.addEventListener('click', function () { go(1); }); }

  track.addEventListener('scroll', function () { window.requestAnimationFrame(update); }, { passive: true });
  window.addEventListener('resize', update);
  track.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') { e.preventDefault(); go(1); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); }
  });

  /* drag with the mouse (touch already scrolls natively) */
  var down = false, moved = false, startX = 0, startLeft = 0;
  track.addEventListener('pointerdown', function (e) {
    if (e.pointerType !== 'mouse' || e.button !== 0) { return; }
    down = true; moved = false; startX = e.clientX; startLeft = track.scrollLeft;
  });
  window.addEventListener('pointermove', function (e) {
    if (!down) { return; }
    var dx = e.clientX - startX;
    if (!moved && Math.abs(dx) > 6) { moved = true; track.classList.add('is-dragging'); }
    if (moved) { track.scrollLeft = startLeft - dx; }
  });
  window.addEventListener('pointerup', function () {
    if (!down) { return; }
    down = false;
    track.classList.remove('is-dragging');
  });
  track.addEventListener('click', function (e) {
    if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; }   /* a drag must not open the link */
  }, true);
  track.addEventListener('dragstart', function (e) { e.preventDefault(); });

  update();
})();

/* ---------- Testimonials carousel ---------- */
(function () {
  'use strict';

  var root = document.querySelector('[data-tm]');
  if (!root) { return; }

  var slides = Array.prototype.slice.call(root.querySelectorAll('.tm__slide'));
  var thumbs = Array.prototype.slice.call(root.querySelectorAll('.tm__thumb'));
  var prev = root.querySelector('[data-tm-prev]');
  var next = root.querySelector('[data-tm-next]');
  var box = root.querySelector('.tm__slides');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var DELAY = 7000;
  var cur = 0, timer = null, hovered = false, visible = true;

  function show(i) {
    cur = (i + slides.length) % slides.length;
    slides.forEach(function (s, k) {
      s.classList.toggle('is-active', k === cur);
      s.setAttribute('aria-hidden', k === cur ? 'false' : 'true');
    });
    thumbs.forEach(function (t, k) {
      if (k === cur) { t.setAttribute('aria-current', 'true'); } else { t.removeAttribute('aria-current'); }
    });
  }

  function stop() { window.clearInterval(timer); timer = null; }
  function start() {
    stop();
    if (reduce || hovered || !visible || document.hidden) { box.setAttribute('aria-live', 'polite'); return; }
    box.setAttribute('aria-live', 'off');
    timer = window.setInterval(function () { show(cur + 1); }, DELAY);
  }

  if (prev) { prev.addEventListener('click', function () { show(cur - 1); start(); }); }
  if (next) { next.addEventListener('click', function () { show(cur + 1); start(); }); }
  thumbs.forEach(function (t, k) { t.addEventListener('click', function () { show(k); start(); }); });

  root.addEventListener('mouseenter', function () { hovered = true; start(); });
  root.addEventListener('mouseleave', function () { hovered = false; start(); });
  root.addEventListener('focusin', function () { hovered = true; start(); });
  root.addEventListener('focusout', function () { hovered = false; start(); });
  document.addEventListener('visibilitychange', start);
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) { visible = entries[0].isIntersecting; start(); }, { threshold: 0.3 }).observe(root);
  }
  root.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') { show(cur + 1); start(); }
    else if (e.key === 'ArrowLeft') { show(cur - 1); start(); }
  });

  show(0);
  start();
})();
