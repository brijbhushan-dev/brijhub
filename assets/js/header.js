/* header.js - header behaviour: sticky state, mobile menu, multi-level dropdowns,
   language dropdown, website search and the login / account dialog. */
(function () {
  'use strict';

  var header = document.getElementById('site-header');
  if (!header) { return; }

  var root = document.documentElement;
  var body = document.body;
  var topbar = header.querySelector('.site-header__topbar');

  function $(sel, ctx) { return (ctx || header).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || header).querySelectorAll(sel)); }

  /* ---------- Body scroll lock (menu / search / dialog) ---------- */
  var locks = { menu: false, search: false, auth: false };
  function setLock(key, on) {
    locks[key] = on;
    body.classList.toggle('has-overlay-open', locks.menu || locks.search || locks.auth);
  }

  /* ---------- Sticky: top strip scrolls away, nav stays; progress line ---------- */
  var ticking = false;
  function measure() { root.style.setProperty('--topbar-h', topbar.offsetHeight + 'px'); }
  function onScroll() {
    var y = window.pageYOffset || root.scrollTop;
    var max = root.scrollHeight - window.innerHeight;
    header.classList.toggle('is-stuck', y > topbar.offsetHeight);
    header.style.setProperty('--scroll-progress', (max > 0 ? Math.min(y / max, 1) * 100 : 0) + '%');
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { window.requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });
  window.addEventListener('resize', function () { measure(); onScroll(); });
  if (window.ResizeObserver) { new ResizeObserver(measure).observe(topbar); }
  measure();
  onScroll();

  /* ---------- Active menu link ---------- */
  var file = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  $$('.site-header__link').forEach(function (a) {
    var href = (a.getAttribute('href') || '').split('/').pop().toLowerCase();
    if (href && href === file) {
      a.classList.add('is-active');
      a.setAttribute('aria-current', 'page');
      var up = a.closest('.has-children');
      while (up) {
        var parentLink = up.querySelector(':scope > .site-header__link');
        if (parentLink) { parentLink.classList.add('is-active'); }
        up = up.parentElement ? up.parentElement.closest('.has-children') : null;
      }
    }
  });

  /* ---------- Mobile menu ---------- */
  var menu = $('#siteMenu');
  var burger = $('#menuToggle');
  var backdrop = $('#menuBackdrop');
  var mqDesktop = window.matchMedia('(min-width: 992px)');

  function setMenu(open) {
    menu.classList.toggle('is-open', open);
    backdrop.classList.toggle('is-open', open);
    burger.classList.toggle('is-open', open);
    header.classList.toggle('is-menu-open', open);
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    setLock('menu', open);
  }
  var menuClose = $('[data-menu-close]');
  burger.addEventListener('click', function () {
    var willOpen = !menu.classList.contains('is-open');
    setMenu(willOpen);
    if (willOpen) { window.setTimeout(function () { menuClose.focus(); }, 60); }
  });
  menuClose.addEventListener('click', function () { setMenu(false); burger.focus(); });
  backdrop.addEventListener('click', function () { setMenu(false); });
  $$('.site-header__link', menu).forEach(function (a) {
    a.addEventListener('click', function () { if (!mqDesktop.matches) { setMenu(false); } });
  });
  function onDesktopChange() { if (mqDesktop.matches) { setMenu(false); } }
  if (mqDesktop.addEventListener) { mqDesktop.addEventListener('change', onDesktopChange); } else { mqDesktop.addListener(onDesktopChange); }

  /* ---------- Multi-level dropdowns (any depth) ---------- */
  function closeItem(li) {
    li.classList.remove('is-open');
    var t = li.querySelector(':scope > .site-header__sub-toggle');
    if (t) { t.setAttribute('aria-expanded', 'false'); }
    $$('.has-children.is-open', li).forEach(closeItem);
  }
  function closeAllSubs() { $$('.has-children.is-open').forEach(closeItem); }

  $$('.has-children').forEach(function (li) {
    var t = li.querySelector(':scope > .site-header__sub-toggle');
    t.addEventListener('click', function (e) {
      e.stopPropagation();
      var willOpen = !li.classList.contains('is-open');
      Array.prototype.forEach.call(li.parentNode.children, function (sib) { if (sib !== li) { closeItem(sib); } });
      li.classList.toggle('is-open', willOpen);
      t.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
    });
  });

  /* ---------- Language dropdown ---------- */
  var langBox = $('#langBox');
  var langBtn = $('#langBtn');
  function setLangMenu(open) {
    langBox.classList.toggle('is-open', open);
    langBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  }
  /* Whole-site translation with the Google Translate widget (loaded only when a language other than English is chosen) */
  var gtState = 'idle', gtQueue = [];
  function gtCodes() { return $$('[data-lang]', langBox).map(function (b) { return b.getAttribute('data-lang'); }).join(','); }
  function loadGoogle(cb) {
    if (gtState === 'ready') { cb(); return; }
    gtQueue.push(cb);
    if (gtState === 'loading') { return; }
    gtState = 'loading';
    window.__siteGtInit = function () {
      new window.google.translate.TranslateElement({ pageLanguage: 'en', includedLanguages: gtCodes(), autoDisplay: false }, 'google_translate_element');
      gtState = 'ready';
      gtQueue.splice(0).forEach(function (f) { f(); });
    };
    var s = document.createElement('script');
    s.src = 'https://translate.google.com/translate_a/element.js?cb=__siteGtInit';
    s.async = true;
    s.onerror = function () { gtState = 'idle'; gtQueue = []; };
    document.head.appendChild(s);
  }
  function applyGoogle(code) {
    var tries = 0;
    (function wait() {
      var combo = document.querySelector('select.goog-te-combo');
      if (combo) { combo.value = code; combo.dispatchEvent(new Event('change')); return; }
      if (tries++ < 40) { setTimeout(wait, 150); }
    })();
  }
  function gtCookie() { var m = document.cookie.match(/(?:^|; )googtrans=([^;]*)/); return m ? m[1] : ''; }
  function setGtCookie(val) {
    var exp = val ? '' : '; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    document.cookie = 'googtrans=' + val + '; path=/' + exp;
    var host = location.hostname;
    if (host && host.indexOf('.') > -1) { document.cookie = 'googtrans=' + val + '; path=/; domain=' + host + exp; }
  }
  /* Choosing a language stores it in Google's cookie and reloads once, so the whole page is translated reliably. */
  function translatePage(code, silent) {
    var want = code === 'en' ? '' : '/en/' + code;
    if (gtCookie() === want) { if (want) { loadGoogle(function () {}); } return; }
    setGtCookie(want);
    if (silent) { if (want) { loadGoogle(function () {}); } return; }
    if (gtCookie() === want) { location.reload(); }
    else if (want) { loadGoogle(function () { applyGoogle(code); }); }   /* cookies blocked (e.g. file://) */
  }
  function setLang(code, silent) {
    var opt = $('[data-lang="' + code + '"]', langBox);
    if (!opt) { return; }
    $$('[data-lang]', langBox).forEach(function (b) {
      if (b === opt) { b.setAttribute('aria-current', 'true'); } else { b.removeAttribute('aria-current'); }
    });
    var shownFlag = langBtn.querySelector('.flag');
    shownFlag.innerHTML = opt.querySelector('.flag').innerHTML;
    langBtn.querySelector('.site-header__lang-code').textContent = code.toUpperCase();
    root.setAttribute('lang', code);
    if (!silent) { try { localStorage.setItem('siteLang', code); } catch (e) { /* storage unavailable */ } }
    translatePage(code, silent);
    document.dispatchEvent(new CustomEvent('site:languagechange', { detail: { code: code } }));
  }
  /* Phone number and the footer year are shown with the digits of the chosen language. The tel: / mailto: links stay unchanged so they still work. */
  var DIGITS = {
    hi: '०१२३४५६७८९', mr: '०१२३४५६७८९', ne: '०१२३४५६७८९', bn: '০১২৩৪৫৬৭৮৯', gu: '૦૧૨૩૪૫૬૭૮૯', ta: '௦௧௨௩௪௫௬௭௮௯',
    te: '౦౧౨౩౪౫౬౭౮౯', kn: '೦೧೨೩೪೫೬೭೮೯', ml: '൦൧൨൩൪൫൬൭൮൯', pa: '੦੧੨੩੪੫੬੭੮੯', ar: '٠١٢٣٤٥٦٧٨٩', ur: '۰۱۲۳۴۵۶۷۸۹',
    fa: '۰۱۲۳۴۵۶۷۸۹', th: '๐๑๒๓๔๕๖๗๘๙'
  };
  var PHONE_RE = /9711101482/g;
  function localizeDigits(code) {
    var set = DIGITS[code];
    if (!set) { return; }
    var yr = document.getElementById('footerYear');
    if (yr) { yr.textContent = String(new Date().getFullYear()).replace(/[0-9]/g, function (d) { return set.charAt(+d); }); }
    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null);
    var n;
    while ((n = walker.nextNode())) {
      if (PHONE_RE.test(n.nodeValue)) {
        PHONE_RE.lastIndex = 0;
        n.nodeValue = n.nodeValue.replace(PHONE_RE, function (m) { return m.replace(/[0-9]/g, function (d) { return set.charAt(+d); }); });
      }
      PHONE_RE.lastIndex = 0;
    }
  }
  function keepLocalized() {
    var code = root.getAttribute('lang');
    if (!DIGITS[code]) { return; }
    var runs = 0;
    var timer = setInterval(function () { localizeDigits(code); if (++runs > 30) { clearInterval(timer); } }, 1000);
  }
  langBtn.addEventListener('click', function (e) { e.stopPropagation(); setLangMenu(!langBox.classList.contains('is-open')); });
  $$('[data-lang]', langBox).forEach(function (b) {
    b.addEventListener('click', function () { setLang(b.getAttribute('data-lang')); setLangMenu(false); langBtn.focus(); });
  });
  try { var saved = localStorage.getItem('siteLang'); if (saved) { setLang(saved, true); } } catch (e) { /* ignore */ }
  keepLocalized();

  document.addEventListener('click', function (e) {
    if (!e.target.closest('#langBox')) { setLangMenu(false); }
    if (!e.target.closest('.has-children')) { closeAllSubs(); }
  });

  /* ---------- Website search ---------- */
  var searchBox = $('#siteSearch');
  var searchInput = $('#siteSearchInput');
  var resultsBox = $('#siteSearchResults');
  var tagsBox = $('#siteSearchTags');
  var searchOpener = $('#searchOpen');
  var activeIdx = -1;
  var searchTimer = null;

  function esc(str) { return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

  function highlight(text, tokens) {
    var frag = document.createDocumentFragment();
    if (!tokens.length) { frag.appendChild(document.createTextNode(text)); return frag; }
    var re = new RegExp('(' + tokens.map(esc).join('|') + ')', 'ig');
    text.split(re).forEach(function (part, i) {
      if (i % 2) { var m = document.createElement('mark'); m.textContent = part; frag.appendChild(m); }
      else if (part) { frag.appendChild(document.createTextNode(part)); }
    });
    return frag;
  }

  function svgIcon(id, cls) {
    var ns = 'http://www.w3.org/2000/svg';
    var s = document.createElementNS(ns, 'svg');
    s.setAttribute('class', 'si' + (cls ? ' ' + cls : ''));
    s.setAttribute('aria-hidden', 'true');
    var u = document.createElementNS(ns, 'use');
    u.setAttribute('href', '#i-' + id);
    s.appendChild(u);
    return s;
  }

  function pageHeadings() {
    var out = [];
    Array.prototype.forEach.call(document.querySelectorAll('h1, h2, h3, h4'), function (h) {
      if (h.closest('header, footer, dialog, .search')) { return; }
      var t = h.textContent.replace(/\s+/g, ' ').trim();
      if (t) { out.push({ title: t, el: h, desc: 'On this page', keywords: '' }); }
    });
    return out;
  }

  function matches(entry, tokens) {
    var hay = (entry.title + ' ' + (entry.desc || '') + ' ' + (entry.keywords || '')).toLowerCase();
    var score = 0;
    for (var i = 0; i < tokens.length; i++) {
      if (hay.indexOf(tokens[i]) === -1) { return 0; }
      score += entry.title.toLowerCase().indexOf(tokens[i]) !== -1 ? 3 : 1;
    }
    return score;
  }

  function makeItem(entry, tokens, idx) {
    var item = document.createElement(entry.url ? 'a' : 'button');
    item.className = 'search__item';
    item.style.animationDelay = (idx * 40) + 'ms';
    if (entry.url) { item.href = entry.url; } else { item.type = 'button'; }

    var ic = document.createElement('span'); ic.className = 'search__item-icon'; ic.appendChild(svgIcon(entry.url ? 'page' : 'hash'));
    var tx = document.createElement('span'); tx.className = 'search__item-text';
    var ti = document.createElement('span'); ti.className = 'search__item-title'; ti.appendChild(highlight(entry.title, tokens));
    var de = document.createElement('span'); de.className = 'search__item-desc'; de.appendChild(highlight(entry.desc || '', tokens));
    tx.appendChild(ti); tx.appendChild(de);
    item.appendChild(ic); item.appendChild(tx); item.appendChild(svgIcon('arrow', 'arrow'));

    if (!entry.url) {
      item.addEventListener('click', function () {
        closeSearch(true);
        window.setTimeout(function () { entry.el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 120);
      });
    }
    return item;
  }

  function group(label) { var g = document.createElement('p'); g.className = 'search__group'; g.textContent = label; return g; }

  function render() {
    var q = searchInput.value.trim().toLowerCase();
    var tokens = q.split(/\s+/).filter(Boolean);
    resultsBox.innerHTML = '';
    activeIdx = -1;
    if (!tokens.length) { return; }

    function find(list) {
      return list.map(function (e) { return { e: e, s: matches(e, tokens) }; })
        .filter(function (r) { return r.s > 0; })
        .sort(function (a, b) { return b.s - a.s; })
        .map(function (r) { return r.e; });
    }
    var pages = find(window.SITE_SEARCH_INDEX || []);
    var here = find(pageHeadings());
    var n = 0;

    if (pages.length) { resultsBox.appendChild(group('Pages')); pages.slice(0, 8).forEach(function (e) { resultsBox.appendChild(makeItem(e, tokens, n++)); }); }
    if (here.length) { resultsBox.appendChild(group('On this page')); here.slice(0, 6).forEach(function (e) { resultsBox.appendChild(makeItem(e, tokens, n++)); }); }

    if (!n) {
      var empty = document.createElement('div');
      empty.className = 'search__empty';
      var s = document.createElement('strong'); s.textContent = 'No results found';
      var p = document.createElement('span'); p.textContent = 'Try a different word, or check the spelling.';
      empty.appendChild(s); empty.appendChild(p);
      resultsBox.appendChild(empty);
    }
  }

  function setActive(i) {
    var items = $$('.search__item', resultsBox);
    if (!items.length) { return; }
    activeIdx = (i + items.length) % items.length;
    items.forEach(function (it, k) { it.classList.toggle('is-active', k === activeIdx); });
    items[activeIdx].scrollIntoView({ block: 'nearest' });
  }

  function buildTags() {
    var tags = window.SITE_SEARCH_TAGS || [];
    tagsBox.innerHTML = '';
    if (!tags.length) { return; }
    var label = document.createElement('span'); label.className = 'search__tags-label'; label.textContent = 'Popular:';
    tagsBox.appendChild(label);
    tags.forEach(function (t) {
      var b = document.createElement('button'); b.type = 'button'; b.textContent = t;
      b.addEventListener('click', function () { searchInput.value = t; render(); searchInput.focus(); });
      tagsBox.appendChild(b);
    });
  }

  function openSearch() {
    searchBox.hidden = false;
    void searchBox.offsetWidth;                       /* restart transition */
    searchBox.classList.add('is-open');
    setLock('search', true);
    buildTags();
    window.setTimeout(function () { searchInput.focus(); }, 60);
  }
  function closeSearch(skipFocus) {
    searchBox.classList.remove('is-open');
    setLock('search', false);
    window.clearTimeout(searchTimer);
    searchTimer = window.setTimeout(function () { searchBox.hidden = true; }, 300);
    if (!skipFocus) { searchOpener.focus(); }
  }

  searchOpener.addEventListener('click', openSearch);
  $('[data-search-close]').addEventListener('click', function () { closeSearch(); });
  searchBox.addEventListener('click', function (e) { if (e.target === searchBox) { closeSearch(); } });
  searchInput.addEventListener('input', render);

  /* keep keyboard focus inside the search overlay while it is open */
  searchBox.addEventListener('keydown', function (e) {
    if (e.key !== 'Tab') { return; }
    var f = $$('button, a[href], input', searchBox).filter(function (el) { return el.getClientRects().length > 0; });
    if (!f.length) { return; }
    var first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });
  searchInput.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive(activeIdx + 1); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive(activeIdx - 1); }
    else if (e.key === 'Enter') {
      var items = $$('.search__item', resultsBox);
      var target = items[activeIdx > -1 ? activeIdx : 0];
      if (target) { e.preventDefault(); target.click(); }
    }
  });

  /* ---------- Login / account dialog ---------- */
  var dlg = $('#authDialog');
  var views = $$('.auth__view', dlg);
  var pendingEmail = '';

  function openAuth(view) {
    showView(view || 'login');
    if (typeof dlg.showModal === 'function') { dlg.showModal(); } else { dlg.setAttribute('open', ''); }
    setLock('auth', true);
    if (!mqDesktop.matches) { setMenu(false); }
  }
  function closeAuth() { if (dlg.open) { dlg.close(); } }
  dlg.addEventListener('close', function () { setLock('auth', false); });
  dlg.addEventListener('click', function (e) { if (e.target === dlg) { closeAuth(); } });

  function showView(name) {
    views.forEach(function (v) { v.hidden = v.getAttribute('data-view') !== name; });
    var active = $('[data-view="' + name + '"]', dlg);
    var h = active.querySelector('h2');
    if (h) { dlg.setAttribute('aria-labelledby', h.id); }
    $$('.form-control-custom', active).forEach(function (i) { setError(i, ''); });
    var first = active.querySelector('input:not([type="checkbox"]), .auth__submit');
    window.setTimeout(function () { if (first) { first.focus(); } }, 60);
  }

  $$('[data-auth-open]').forEach(function (b) { b.addEventListener('click', function () { openAuth('login'); }); });
  $$('[data-auth-close]', dlg).forEach(function (b) { b.addEventListener('click', closeAuth); });
  $$('[data-auth-view]', dlg).forEach(function (b) { b.addEventListener('click', function () { showView(b.getAttribute('data-auth-view')); }); });

  $$('[data-toggle-pw]', dlg).forEach(function (b) {
    b.addEventListener('click', function () {
      var input = b.parentNode.querySelector('input');
      var show = input.type === 'password';
      input.type = show ? 'text' : 'password';
      b.classList.toggle('is-on', show);
      b.setAttribute('aria-label', show ? 'Hide password' : 'Show password');
    });
  });

  /* validation */
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  function ruleMessage(input) {
    var rule = input.getAttribute('data-rule') || '';
    var v = input.value;
    if (rule === 'terms') { return input.checked ? '' : 'Please accept the terms to continue.'; }
    if (!v.trim()) { return 'This field is required.'; }
    if (rule === 'email' && !EMAIL_RE.test(v.trim())) { return 'Enter a valid email address.'; }
    if (rule === 'name' && v.trim().length < 2) { return 'Enter your full name.'; }
    if (rule === 'password' && v.length < 8) { return 'Password must be at least 8 characters.'; }
    if (rule === 'code' && !/^\d{6}$/.test(v.trim())) { return 'Enter the 6-digit code.'; }
    if (rule.indexOf('match:') === 0) {
      var other = document.getElementById(rule.slice(6));
      if (other && other.value !== v) { return 'Passwords do not match.'; }
    }
    return '';
  }
  function setError(input, msg) {
    var err = document.getElementById(input.id + '-err');
    input.classList.toggle('is-invalid-custom', !!msg);
    if (msg) { input.setAttribute('aria-invalid', 'true'); if (err) { input.setAttribute('aria-describedby', err.id); } }
    else { input.removeAttribute('aria-invalid'); input.removeAttribute('aria-describedby'); }
    if (err) { err.textContent = msg; err.hidden = !msg; }
  }

  /* Connect your real authentication API here. It must return a Promise. */
  function sendToServer(kind, data) {
    return new Promise(function (resolve) { window.setTimeout(function () { resolve({ ok: true, kind: kind, data: data }); }, 700); });
  }

  var DONE = {
    login: { title: 'Welcome back!', text: 'You have logged in successfully.' },
    register: { title: 'Account created', text: 'Your account is ready. You can now log in.' },
    reset: { title: 'Password updated', text: 'Your password was changed. Please log in with your new password.' }
  };

  $$('[data-auth-form]', dlg).forEach(function (form) {
    var kind = form.getAttribute('data-auth-form');
    var fields = $$('[data-rule]', form);

    fields.forEach(function (f) {
      f.addEventListener('input', function () { if (f.classList.contains('is-invalid-custom')) { setError(f, ruleMessage(f)); } });
      f.addEventListener('change', function () { if (f.classList.contains('is-invalid-custom')) { setError(f, ruleMessage(f)); } });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var firstBad = null;
      fields.forEach(function (f) {
        var msg = ruleMessage(f);
        setError(f, msg);
        if (msg && !firstBad) { firstBad = f; }
      });
      if (firstBad) { firstBad.focus(); return; }

      var btn = form.querySelector('.auth__submit');
      btn.classList.add('is-loading');
      var payload = {};
      fields.forEach(function (f) { if (f.type !== 'password') { payload[f.name] = f.type === 'checkbox' ? f.checked : f.value; } });

      sendToServer(kind, payload).then(function () {
        btn.classList.remove('is-loading');
        if (kind === 'forgot') {
          pendingEmail = payload.email;
          $$('[data-auth-email]', dlg).forEach(function (n) { n.textContent = pendingEmail; });
          showView('reset');
        } else {
          var d = DONE[kind];
          $('[data-auth-done-title]', dlg).textContent = d.title;
          $('[data-auth-done-text]', dlg).textContent = d.text;
          form.reset();
          showView('done');
        }
      });
    });
  });

  /* ---------- Escape key ---------- */
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') { return; }
    if (!searchBox.hidden && searchBox.classList.contains('is-open')) { closeSearch(); return; }
    if (langBox.classList.contains('is-open')) { setLangMenu(false); langBtn.focus(); return; }
    if (menu.classList.contains('is-open')) { setMenu(false); burger.focus(); return; }
    closeAllSubs();
  });
})();
