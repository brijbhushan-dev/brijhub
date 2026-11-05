/* header-markup.js - the common header HTML (single source of truth).
   Injected on every page by assets/js/include.js (works from file:// too).

   EDIT HERE:
   - MENU      : add / remove items. Add a "children" array for a dropdown;
                 children can have their own "children" (unlimited levels).
   - LANGUAGES : add / remove languages (code, English name, native name, flag).
   - SOCIAL    : social links (same icons as the footer).
   - CONTACT   : phone + email shown in the top strip. */
(function () {
  'use strict';

  /* ---------------- Content ---------------- */
  var CONTACT = { phone: '9711101482', email: 'brijpant88@gmail.com' };

  var MENU = [
    { label: 'Home', href: 'index.html' },
    { label: 'Who We Are', href: 'about.html' },
    { label: 'Contact Us', href: 'contact.html' },
    { label: 'Help', href: 'help.html' },
    { label: 'FAQs', href: 'faqs.html' },
    { label: 'Blog', href: 'blog.html' }
    /* Multi-level example (copy into the list above):
    { label: 'Services', href: 'services.html', children: [
        { label: 'Web Design', href: 'web-design.html' },
        { label: 'Development', href: 'development.html', children: [
            { label: 'Frontend', href: 'frontend.html' },
            { label: 'Backend', href: 'backend.html' }
        ] }
    ] }
    */
  ];

  var SOCIAL = [
    { id: 'facebook', cls: 'is-facebook', label: 'Facebook' },
    { id: 'twitter', cls: 'is-twitter', label: 'Twitter' },
    { id: 'youtube', cls: 'is-youtube', label: 'YouTube' },
    { id: 'linkedin', cls: 'is-linkedin', label: 'LinkedIn', url: 'https://www.linkedin.com/in/brij-bhushan-pant-ba8000a4/' },
    { id: 'gplus', cls: 'is-gplus', label: 'Google Plus' }
  ];

  var FLAGS = {
    en: '<svg viewBox="0 0 60 30" preserveAspectRatio="none" aria-hidden="true"><rect width="60" height="30" fill="#012169"/><path d="M0 0L60 30M60 0L0 30" stroke="#fff" stroke-width="6"/><path d="M0 0L60 30M60 0L0 30" stroke="#C8102E" stroke-width="2"/><path d="M30 0v30M0 15h60" stroke="#fff" stroke-width="10"/><path d="M30 0v30M0 15h60" stroke="#C8102E" stroke-width="6"/></svg>',
    hi: '<svg viewBox="0 0 30 20" preserveAspectRatio="none" aria-hidden="true"><rect width="30" height="6.67" fill="#FF9933"/><rect y="6.67" width="30" height="6.67" fill="#fff"/><rect y="13.33" width="30" height="6.67" fill="#138808"/><circle cx="15" cy="10" r="2.4" fill="none" stroke="#000080" stroke-width=".8"/></svg>',
    ar: '<svg viewBox="0 0 30 20" preserveAspectRatio="none" aria-hidden="true"><rect width="30" height="6.67" fill="#00732F"/><rect y="6.67" width="30" height="6.67" fill="#fff"/><rect y="13.33" width="30" height="6.67" fill="#000"/><rect width="7.5" height="20" fill="#FF0000"/></svg>',
    es: '<svg viewBox="0 0 30 20" preserveAspectRatio="none" aria-hidden="true"><rect width="30" height="20" fill="#AA151B"/><rect y="5" width="30" height="10" fill="#F1BF00"/></svg>',
    fr: '<svg viewBox="0 0 30 20" preserveAspectRatio="none" aria-hidden="true"><rect width="10" height="20" fill="#0055A4"/><rect x="10" width="10" height="20" fill="#fff"/><rect x="20" width="10" height="20" fill="#EF4135"/></svg>',
    de: '<svg viewBox="0 0 30 20" preserveAspectRatio="none" aria-hidden="true"><rect width="30" height="6.67" fill="#000"/><rect y="6.67" width="30" height="6.67" fill="#DD0000"/><rect y="13.33" width="30" height="6.67" fill="#FFCE00"/></svg>'
  };

  var LANGUAGES = [
    { code: 'en', name: 'English', native: 'English' },
    { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
    { code: 'bn', name: 'Bengali', native: 'বাংলা' },
    { code: 'mr', name: 'Marathi', native: 'मराठी' },
    { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી' },
    { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
    { code: 'te', name: 'Telugu', native: 'తెలుగు' },
    { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ' },
    { code: 'ml', name: 'Malayalam', native: 'മലയാളം' },
    { code: 'pa', name: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
    { code: 'ur', name: 'Urdu', native: 'اردو' },
    { code: 'ne', name: 'Nepali', native: 'नेपाली' },
    { code: 'ar', name: 'Arabic', native: 'العربية' },
    { code: 'es', name: 'Spanish', native: 'Español' },
    { code: 'fr', name: 'French', native: 'Français' },
    { code: 'de', name: 'German', native: 'Deutsch' },
    { code: 'pt', name: 'Portuguese', native: 'Português' },
    { code: 'it', name: 'Italian', native: 'Italiano' },
    { code: 'ru', name: 'Russian', native: 'Русский' },
    { code: 'zh-CN', name: 'Chinese', native: '中文' },
    { code: 'ja', name: 'Japanese', native: '日本語' },
    { code: 'ko', name: 'Korean', native: '한국어' },
    { code: 'tr', name: 'Turkish', native: 'Türkçe' },
    { code: 'id', name: 'Indonesian', native: 'Indonesia' },
    { code: 'ms', name: 'Malay', native: 'Melayu' },
    { code: 'th', name: 'Thai', native: 'ไทย' },
    { code: 'vi', name: 'Vietnamese', native: 'Tiếng Việt' },
    { code: 'nl', name: 'Dutch', native: 'Nederlands' },
    { code: 'pl', name: 'Polish', native: 'Polski' },
    { code: 'sv', name: 'Swedish', native: 'Svenska' },
    { code: 'el', name: 'Greek', native: 'Ελληνικά' },
    { code: 'uk', name: 'Ukrainian', native: 'Українська' },
    { code: 'fa', name: 'Persian', native: 'فارسی' },
    { code: 'iw', name: 'Hebrew', native: 'עברית' },
    { code: 'sw', name: 'Swahili', native: 'Kiswahili' }
  ];

  /* ---------------- Helpers ---------------- */
  function icon(id) {
    return '<svg class="si" aria-hidden="true" focusable="false"><use href="#i-' + id + '"></use></svg>';
  }

  function menuList(items, level) {
    return '<ul class="' + (level ? 'site-header__sub' : 'site-header__list') + '">' + items.map(function (item) {
      var kids = item.children && item.children.length;
      return '<li class="site-header__item' + (kids ? ' has-children' : '') + '">' +
        '<a class="site-header__link" href="' + item.href + '">' + item.label + '</a>' +
        (kids ? '<button type="button" class="site-header__sub-toggle" aria-expanded="false" aria-label="Show ' + item.label + ' submenu">' + icon('chevron') + '</button>' + menuList(item.children, level + 1) : '') +
        '</li>';
    }).join('') + '</ul>';
  }

  function socialList(cls) {
    return '<ul class="' + cls + '" aria-label="Social media">' + SOCIAL.map(function (s) {
      return '<li><a href="' + (s.url || '#') + '" class="' + s.cls + '" aria-label="' + s.label + '" title="' + s.label + '" target="_blank" rel="noopener">' + icon(s.id) + '</a></li>';
    }).join('') + '</ul>';
  }

  var GLOBE = '<svg viewBox="0 0 24 24" fill="none" stroke="#2f5b8a" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18"/></svg>';
  function flag(code) { return '<span class="flag">' + (FLAGS[code] || GLOBE) + '</span>'; }

  function field(o) {
    return '<div class="form-group-custom">' +
      '<label class="form-label-custom" for="' + o.id + '">' + o.label + '</label>' +
      '<div class="auth__input' + (o.pw ? ' has-toggle' : '') + '">' +
      '<input class="form-control-custom" id="' + o.id + '" name="' + o.name + '" type="' + o.type + '" placeholder="' + o.ph + '" autocomplete="' + o.ac + '" data-rule="' + o.rule + '"' + (o.extra || '') + '>' +
      (o.pw ? '<button type="button" class="auth__eye" data-toggle-pw aria-label="Show password">' + icon('eye') + '</button>' : '') +
      '</div><p class="form-error-custom" id="' + o.id + '-err" hidden></p></div>';
  }

  var anim = '<span class="phone-anim" aria-hidden="true">' +
    '<svg viewBox="0 0 40 40" focusable="false">' +
    '<path class="pa-wave pa-wave--1" d="M27 12a9 9 0 0 1 5 5"/>' +
    '<path class="pa-wave pa-wave--2" d="M27 6a15 15 0 0 1 11 11"/>' +
    '<g class="pa-handset"><path d="M30 25.9v2.5a1.7 1.7 0 0 1-1.8 1.7 16.5 16.5 0 0 1-7.2-2.6 16.2 16.2 0 0 1-5-5 16.5 16.5 0 0 1-2.6-7.3A1.7 1.7 0 0 1 15.1 13.4h2.5a1.7 1.7 0 0 1 1.7 1.4c.1.8.3 1.6.6 2.3a1.7 1.7 0 0 1-.4 1.8l-1 1a13.5 13.5 0 0 0 5 5l1.1-1a1.7 1.7 0 0 1 1.8-.4c.8.3 1.5.5 2.3.6a1.7 1.7 0 0 1 1.4 1.7z"/></g>' +
    '</svg></span>';

  /* ---------------- Icon sprite ---------------- */
  var sprite = '<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false"><defs>' +
    '<symbol id="i-facebook" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></symbol>' +
    '<symbol id="i-twitter" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></symbol>' +
    '<symbol id="i-youtube" viewBox="0 0 24 24"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></symbol>' +
    '<symbol id="i-linkedin" viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></symbol>' +
    '<symbol id="i-gplus" viewBox="0 0 24 24"><path d="M14.5 8.5A6 6 0 1 0 15 12H9"/><path d="M19 8v6M16 11h6"/></symbol>' +
    '<symbol id="i-mail" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></symbol>' +
    '<symbol id="i-phone" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></symbol>' +
    '<symbol id="i-user" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></symbol>' +
    '<symbol id="i-search" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></symbol>' +
    '<symbol id="i-close" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></symbol>' +
    '<symbol id="i-chevron" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></symbol>' +
    '<symbol id="i-check" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></symbol>' +
    '<symbol id="i-lock" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></symbol>' +
    '<symbol id="i-eye" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></symbol>' +
    '<symbol id="i-arrow" viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></symbol>' +
    '<symbol id="i-page" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></symbol>' +
    '<symbol id="i-hash" viewBox="0 0 24 24"><line x1="4" y1="9" x2="20" y2="9"/><line x1="4" y1="15" x2="20" y2="15"/><line x1="10" y1="3" x2="8" y2="21"/><line x1="16" y1="3" x2="14" y2="21"/></symbol>' +
        '<symbol id="ix-code" viewBox="0 0 24 24"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></symbol>' +
    '<symbol id="ix-phone-app" viewBox="0 0 24 24"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></symbol>' +
    '<symbol id="ix-cloud" viewBox="0 0 24 24"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></symbol>' +
    '<symbol id="ix-cpu" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3"/></symbol>' +
    '<symbol id="ix-shield" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></symbol>' +
    '<symbol id="ix-headset" viewBox="0 0 24 24"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></symbol>' +
    '<symbol id="ix-check" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></symbol>' +
    '<symbol id="ix-arrow" viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></symbol>' +
    '<symbol id="ix-search" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></symbol>' +
    '<symbol id="ix-layout" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></symbol>' +
    '<symbol id="ix-rocket" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></symbol>' +
    '<symbol id="ix-phone" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></symbol>' +
    '<symbol id="ix-star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></symbol>' +
    '<symbol id="ix-left" viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></symbol>' +
    '<symbol id="ix-right" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></symbol>' +
    '<symbol id="ix-up-right" viewBox="0 0 24 24"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></symbol>' +
    '<symbol id="ix-linkedin" viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></symbol>' +
    '<symbol id="ix-twitter" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></symbol>' +
    '<symbol id="ix-mail" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></symbol>' +
    '<symbol id="ix-target" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></symbol>' +
    '<symbol id="ix-eye" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></symbol>' +
    '<symbol id="ix-heart" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></symbol>' +
    '<symbol id="ix-award" viewBox="0 0 24 24"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></symbol>' +
    '<symbol id="ix-users" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></symbol>' +
    '<symbol id="ix-globe" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></symbol>' +
    '<symbol id="ix-zap" viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></symbol>' +
    '<symbol id="ix-bulb" viewBox="0 0 24 24"><path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.1V17h6v-.2c0-.8.4-1.6 1-2.1A7 7 0 0 0 12 2z"/></symbol>' +
    '<symbol id="ix-trend" viewBox="0 0 24 24"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></symbol>' +
    '<symbol id="ix-pin" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></symbol>' +
    '<symbol id="ix-play" viewBox="0 0 24 24"><polygon points="6 3 20 12 6 21 6 3"/></symbol>' +
    '<symbol id="ix-calendar" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></symbol>' +
    '<symbol id="ix-layers" viewBox="0 0 24 24"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></symbol>' +
        '<symbol id="ix-print" viewBox="0 0 24 24"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></symbol>' +
    '<symbol id="ix-download" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></symbol>' +
    '<symbol id="ix-file" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></symbol>' +
    '<symbol id="ix-clock" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></symbol>' +
    '</defs></svg>';

  /* ---------------- Login / account dialog ---------------- */
  var auth =
    '<dialog class="auth" id="authDialog" aria-labelledby="authTitle-login">' +
    '<div class="auth__shell">' +
    '<aside class="auth__side" aria-hidden="true">' +
    '<span class="auth__orb auth__orb--1"></span><span class="auth__orb auth__orb--2"></span><span class="auth__orb auth__orb--3"></span>' +
    '<div class="auth__side-body"><span class="auth__badge">' + icon('lock') + '</span>' +
    '<h3>Welcome to BrijHub</h3><p>Community. Connection. Collaboration.</p>' +
    '<ul><li>' + icon('check') + 'Secure sign in</li><li>' + icon('check') + 'Your saved preferences</li><li>' + icon('check') + 'Faster support</li></ul></div>' +
    '</aside>' +
    '<button type="button" class="auth__close" data-auth-close aria-label="Close">' + icon('close') + '</button>' +
    '<div class="auth__main">' +

    /* login */
    '<section class="auth__view" data-view="login">' +
    '<h2 id="authTitle-login">Login</h2><p class="auth__lead">Welcome back! Please sign in to continue.</p>' +
    '<form data-auth-form="login" novalidate>' +
    field({ id: 'loginEmail', name: 'email', label: 'Email address', type: 'email', ph: 'you@example.com', ac: 'username', rule: 'email' }) +
    field({ id: 'loginPass', name: 'password', label: 'Password', type: 'password', ph: 'Enter your password', ac: 'current-password', rule: 'required', pw: true }) +
    '<div class="auth__row"><label class="form-check-custom"><input type="checkbox" name="remember"><span>Remember me</span></label>' +
    '<button type="button" class="auth__link" data-auth-view="forgot">Forgot password?</button></div>' +
    '<button type="submit" class="btn-primary-custom auth__submit">Login</button>' +
    '</form>' +
    '<p class="auth__switch">New here? <button type="button" class="auth__link" data-auth-view="register">Create an account</button></p>' +
    '</section>' +

    /* register */
    '<section class="auth__view" data-view="register" hidden>' +
    '<h2 id="authTitle-register">Create account</h2><p class="auth__lead">Join us in less than a minute.</p>' +
    '<form data-auth-form="register" novalidate>' +
    field({ id: 'regName', name: 'name', label: 'Full name', type: 'text', ph: 'Your name', ac: 'name', rule: 'name' }) +
    field({ id: 'regEmail', name: 'email', label: 'Email address', type: 'email', ph: 'you@example.com', ac: 'email', rule: 'email' }) +
    field({ id: 'regPass', name: 'password', label: 'Password', type: 'password', ph: 'At least 8 characters', ac: 'new-password', rule: 'password', pw: true }) +
    field({ id: 'regPass2', name: 'confirm', label: 'Confirm password', type: 'password', ph: 'Repeat your password', ac: 'new-password', rule: 'match:regPass', pw: true }) +
    '<div class="form-group-custom"><label class="form-check-custom"><input type="checkbox" id="regTerms" name="terms" data-rule="terms"><span>I agree to the <a href="terms-of-service.html">Terms of Service</a> and <a href="privacy-policy.html">Privacy Policy</a></span></label><p class="form-error-custom" id="regTerms-err" hidden></p></div>' +
    '<button type="submit" class="btn-primary-custom auth__submit">Create account</button>' +
    '</form>' +
    '<p class="auth__switch">Already have an account? <button type="button" class="auth__link" data-auth-view="login">Login</button></p>' +
    '</section>' +

    /* forgot - step 1 */
    '<section class="auth__view" data-view="forgot" hidden>' +
    '<h2 id="authTitle-forgot">Forgot password?</h2><p class="auth__lead">Enter your email and we will send you a 6-digit verification code.</p>' +
    '<form data-auth-form="forgot" novalidate>' +
    field({ id: 'forgotEmail', name: 'email', label: 'Email address', type: 'email', ph: 'you@example.com', ac: 'email', rule: 'email' }) +
    '<button type="submit" class="btn-primary-custom auth__submit">Send code</button>' +
    '</form>' +
    '<p class="auth__switch"><button type="button" class="auth__link" data-auth-view="login">Back to login</button></p>' +
    '</section>' +

    /* forgot - step 2 */
    '<section class="auth__view" data-view="reset" hidden>' +
    '<h2 id="authTitle-reset">Set a new password</h2><p class="auth__lead">We sent a code to <strong data-auth-email>your email</strong>. Enter it below with your new password.</p>' +
    '<form data-auth-form="reset" novalidate>' +
    field({ id: 'resetCode', name: 'code', label: 'Verification code', type: 'text', ph: '6-digit code', ac: 'one-time-code', rule: 'code', extra: ' inputmode="numeric" maxlength="6"' }) +
    field({ id: 'resetPass', name: 'password', label: 'New password', type: 'password', ph: 'At least 8 characters', ac: 'new-password', rule: 'password', pw: true }) +
    field({ id: 'resetPass2', name: 'confirm', label: 'Confirm new password', type: 'password', ph: 'Repeat new password', ac: 'new-password', rule: 'match:resetPass', pw: true }) +
    '<button type="submit" class="btn-primary-custom auth__submit">Update password</button>' +
    '</form>' +
    '<p class="auth__switch"><button type="button" class="auth__link" data-auth-view="forgot">Use a different email</button></p>' +
    '</section>' +

    /* done */
    '<section class="auth__view auth__done" data-view="done" hidden>' +
    '<span class="auth__tick">' + icon('check') + '</span>' +
    '<h2 id="authTitle-done" data-auth-done-title>All done</h2><p class="auth__lead" data-auth-done-text></p>' +
    '<button type="button" class="btn-primary-custom auth__submit" data-auth-close>Continue</button>' +
    '</section>' +

    '</div></div></dialog>';

  /* ---------------- Search overlay ---------------- */
  var search =
    '<div class="search" id="siteSearch" role="dialog" aria-modal="true" aria-label="Search the website" hidden>' +
    '<button type="button" class="search__close" data-search-close aria-label="Close search">' + icon('close') + '</button>' +
    '<div class="search__panel">' +
    '<p class="search__eyebrow">Search</p>' +
    '<label class="search__field" for="siteSearchInput">' + icon('search') +
    '<input id="siteSearchInput" type="search" placeholder="Search pages, topics, help..." autocomplete="off" spellcheck="false" enterkeyhint="search" aria-controls="siteSearchResults">' +
    '<kbd>Esc</kbd></label>' +
    '<div class="search__tags" id="siteSearchTags" aria-label="Popular searches"></div>' +
    '<div class="search__results" id="siteSearchResults" aria-live="polite"></div>' +
    '</div></div>';

  /* ---------------- Header ---------------- */
  var langItems = LANGUAGES.map(function (l, i) {
    return '<li><button type="button" data-lang="' + l.code + '"' + (i === 0 ? ' aria-current="true"' : '') + '>' + flag(l.code) +
      '<span class="lang__native">' + l.native + '</span><span class="lang__name">' + l.name + '</span>' + icon('check') + '</button></li>';
  }).join('');

  window.SITE_HEADER_HTML =
    sprite +
    '<div id="google_translate_element" class="notranslate" aria-hidden="true"></div>' +
    '<header class="site-header" id="site-header">' +

    /* Top strip */
    '<div class="site-header__topbar"><div class="container site-header__topbar-inner">' +
    socialList('site-header__social') +
    '<div class="site-header__topbar-right">' +
    '<a class="site-header__contact site-header__phone" href="tel:' + CONTACT.phone + '" aria-label="Call us on ' + CONTACT.phone + '">' + anim + '<span>' + CONTACT.phone + '</span></a>' +
    '<a class="site-header__contact site-header__mail" href="mailto:' + CONTACT.email + '">' + icon('mail') + '<span>' + CONTACT.email + '</span></a>' +
    '<div class="site-header__lang notranslate" id="langBox" translate="no">' +
    '<button type="button" class="site-header__lang-btn" id="langBtn" aria-haspopup="true" aria-expanded="false" aria-controls="langList" aria-label="Select language">' +
    flag('en') + '<span class="site-header__lang-code">EN</span>' + icon('chevron') + '</button>' +
    '<ul class="site-header__lang-list" id="langList">' + langItems + '</ul></div>' +
    '<button type="button" class="site-header__login" data-auth-open>' + icon('user') + '<span>Login</span></button>' +
    '</div></div></div>' +

    /* Main navigation */
    '<div class="site-header__nav"><div class="container site-header__nav-inner">' +
    '<a class="site-header__logo" href="index.html"><img src="assets/images/logo.png" alt="BrijHub - Community, Connection, Collaboration" width="1821" height="535" decoding="async"></a>' +
    '<nav class="site-header__menu" id="siteMenu" aria-label="Main navigation">' +
    '<div class="site-header__menu-head"><span class="site-header__menu-title">Menu</span><button type="button" class="site-header__menu-close" data-menu-close aria-label="Close menu">' + icon('close') + '</button></div>' +
    menuList(MENU, 0) +
    '<div class="site-header__mobile-extras">' +
    '<button type="button" class="site-header__login site-header__login--block" data-auth-open>' + icon('user') + '<span>Login / Register</span></button>' +
    '<a class="site-header__mobile-line" href="tel:' + CONTACT.phone + '">' + icon('phone') + '<span>' + CONTACT.phone + '</span></a>' +
    '<a class="site-header__mobile-line" href="mailto:' + CONTACT.email + '">' + icon('mail') + '<span>' + CONTACT.email + '</span></a>' +
    socialList('site-header__social site-header__social--menu') +
    '</div></nav>' +
    '<div class="site-header__actions">' +
    '<button type="button" class="site-header__icon-btn" id="searchOpen" aria-label="Search the website" aria-haspopup="dialog">' + icon('search') + '</button>' +
    '<button type="button" class="site-header__icon-btn site-header__user-btn" data-auth-open aria-label="Login or register">' + icon('user') + '</button>' +
    '<button type="button" class="site-header__burger" id="menuToggle" aria-expanded="false" aria-controls="siteMenu" aria-label="Open menu"><span></span><span></span><span></span></button>' +
    '</div></div></div>' +
    '<div class="site-header__backdrop" id="menuBackdrop"></div>' +
    search + auth +
    '</header>';
})();
