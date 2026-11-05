# DESIGN_SYSTEM.md

Reusable UI/UX standard for every page of this website and future projects.
Always read `CLAUDE.md` (project root) first, then follow this file for every UI component. If anything here conflicts with `CLAUDE.md`, `CLAUDE.md` wins. Project-specific values (brand colors, names) come from `PROJECT_CONFIG.md` when present.

**Stack:** HTML5, CSS3, Bootstrap 5 (grid + utilities, the only CSS framework), JavaScript, AOS; plain HTML pages, no PHP. Fonts: Outfit (headings), Open Sans (body).

**Contents:** 1 Color · 2 Typography · 3 Buttons · 4 Cards · 5 Forms · 6 Spacing · 7 Container & Grid · 8 Radius & Shadows · 9 Images & Media · 10 Animation · 11 Responsive · 12 Common Components · 13 Accessibility · 14 CSS Architecture · 15 Development Rules

---

## 1. Color System

Secondary (orange) and Alternate (light blue) are **project-configurable**. The values below are defaults; override them only in `:root` (or from `PROJECT_CONFIG.md`) and never hardcode colors elsewhere.

| Token | Default | Use |
|---|---|---|
| `--color-primary` | `#2f5b8a` | Headings, primary buttons, key UI |
| `--color-ink` | `#1B1B1B` | Dark text and icons placed on orange |
| `--color-secondary` | `#FF7A00` | Accents, CTAs, subheadings, highlights |
| `--color-alternate` | `#BFE3FF` | Alternate sections, badges, hover tints |
| `--color-white` | `#FFFFFF` | Cards, inputs, text on dark |
| `--color-bg` | `#FAF9F6` | Page background |
| `--color-bg-light` | `#F3F2EE` | Light section background |
| `--color-bg-soft` | `#ECEAE5` | Hover/skeleton neutral |
| `--color-bg-alt` | `#EAF5FF` | Tint of the alternate color |
| `--color-border` | `#E3E1DC` | Subtle borders, dividers |
| `--color-border-strong` | `#CFCBC3` | Input borders |
| `--color-text` | `#515151` | Body text |
| `--color-text-muted` | `#6B6B6B` | Secondary text (4.5:1 on white) |
| `--color-success` | `#1E7B4A` | Valid state |
| `--color-error` | `#C62828` | Error state |

```css
:root {
  --color-primary: #2f5b8a;
  --color-primary-hover: #244a70;
  --color-ink: #1B1B1B;
  --color-secondary: #FF7A00;
  --color-secondary-hover: #E06A00;
  --color-alternate: #BFE3FF;
  --color-white: #FFFFFF;
  --color-bg: #FAF9F6;
  --color-bg-light: #F3F2EE;
  --color-bg-soft: #ECEAE5;
  --color-bg-alt: #EAF5FF;
  --color-border: #E3E1DC;
  --color-border-strong: #CFCBC3;
  --color-text: #515151;
  --color-text-muted: #6B6B6B;
  --color-success: #1E7B4A;
  --color-error: #C62828;
  --color-focus-ring: rgba(255, 122, 0, .35);
}
```

Rules:
- Main headings use `--color-primary`; subheadings and labels may use `--color-secondary` or `--color-alternate` (alternate only on dark backgrounds, since light blue on white fails contrast).
- Do not introduce additional colors; derive tints from the tokens.
- White text on orange `#FF7A00` fails 4.5:1 at small sizes: use `--color-ink` text on orange, or bold 18px+ white.

---

## 2. Typography

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@600;700&family=Open+Sans:wght@400;600;700&display=swap" rel="stylesheet">
```

| Element | Desktop | Tablet (<992) | Mobile (<576) | Weight | Font |
|---|---|---|---|---|---|
| H1 | 50px | 42px | 32px | 700 | Outfit |
| H2 | 42px | 36px | 28px | 700 | Outfit |
| H3 | 36px | 30px | 24px | 600 | Outfit |
| H4 | 30px | 26px | 22px | 600 | Outfit |
| H5 | 24px | 22px | 20px | 600 | Outfit |
| H6 | 20px | 18px | 18px | 600 | Outfit |
| Body | 16px / 24px | same | same | 400 | Open Sans |
| Small | 14px / 21px | same | same | 400 | Open Sans |
| Button | 16px | same | same | 600 | Open Sans |

All main headings are **UPPERCASE** and use `--color-primary`.

```css
:root {
  --font-heading: 'Outfit', sans-serif;
  --font-body: 'Open Sans', sans-serif;
  --fs-h1: 50px; --fs-h2: 42px; --fs-h3: 36px;
  --fs-h4: 30px; --fs-h5: 24px; --fs-h6: 20px;
}
body { font-family: var(--font-body); font-size: 16px; line-height: 24px; color: var(--color-text); background: var(--color-bg); }
h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading); color: var(--color-primary);
  text-transform: uppercase; line-height: 1.2; margin: 0 0 var(--space-3);
}
h1 { font-size: var(--fs-h1); font-weight: 700; }
h2 { font-size: var(--fs-h2); font-weight: 700; }
h3 { font-size: var(--fs-h3); font-weight: 600; }
h4 { font-size: var(--fs-h4); font-weight: 600; }
h5 { font-size: var(--fs-h5); font-weight: 600; }
h6 { font-size: var(--fs-h6); font-weight: 600; }
p  { margin: 0 0 var(--space-3); }
p:last-child { margin-bottom: 0; }
.text-small { font-size: 14px; line-height: 21px; }
.subheading-custom { font-family: var(--font-heading); font-weight: 600; color: var(--color-secondary); text-transform: none; }

@media (max-width: 991.98px) { :root { --fs-h1: 42px; --fs-h2: 36px; --fs-h3: 30px; --fs-h4: 26px; --fs-h5: 22px; --fs-h6: 18px; } }
@media (max-width: 575.98px) { :root { --fs-h1: 32px; --fs-h2: 28px; --fs-h3: 24px; --fs-h4: 22px; --fs-h5: 20px; --fs-h6: 18px; } }
```

Rule: use one `<h1>` per page and keep heading order (no skipped levels). Style via classes, not by choosing the wrong heading level.

---

## 3. Buttons

One button system for the whole site. Do not create page-specific button styles.

| Class | Look | Use |
|---|---|---|
| `.btn-primary-custom` | Dark fill, white text | Main action |
| `.btn-secondary-custom` | Orange fill, dark text | Highlight / CTA on dark |
| `.btn-outline-custom` | Transparent, dark border | Secondary action |
| `.btn-light-custom` | White fill, subtle border | Actions on tinted/dark sections |
| `.btn-icon-custom` | 44px circle | Icon-only (needs `aria-label`) |

```css
.btn-primary-custom, .btn-secondary-custom, .btn-outline-custom, .btn-light-custom {
  position: relative; overflow: hidden; isolation: isolate;
  display: inline-flex; align-items: center; justify-content: center; gap: 8px;
  padding: 14px 32px; min-height: 48px;
  font-family: var(--font-body); font-size: 16px; font-weight: 600; line-height: 1.2;
  border: 2px solid transparent; border-radius: var(--radius-pill);
  text-decoration: none; cursor: pointer;
  transition: background-color .3s ease, color .3s ease, border-color .3s ease, transform .3s ease, box-shadow .3s ease;
}
.btn-primary-custom   { background: var(--color-primary);   color: var(--color-white); }
.btn-secondary-custom { background: var(--color-secondary); color: var(--color-primary); }
.btn-outline-custom   { background: transparent; color: var(--color-primary); border-color: var(--color-primary); }
.btn-light-custom     { background: var(--color-white); color: var(--color-primary); border-color: var(--color-border); }

.btn-primary-custom:hover   { background: var(--color-primary-hover); color: var(--color-white); }
.btn-secondary-custom:hover { background: var(--color-secondary-hover); color: var(--color-primary); }
.btn-outline-custom:hover   { background: var(--color-primary); color: var(--color-white); }
.btn-light-custom:hover     { background: var(--color-alternate); border-color: var(--color-alternate); color: var(--color-primary); }
.btn-primary-custom:hover, .btn-secondary-custom:hover, .btn-outline-custom:hover, .btn-light-custom:hover {
  transform: translateY(-2px); box-shadow: var(--shadow-button);
}
.btn-primary-custom:active, .btn-secondary-custom:active,
.btn-outline-custom:active, .btn-light-custom:active { transform: translateY(0); }

/* Continuous white shine: sits behind text, never blocks clicks */
.btn-primary-custom::after, .btn-secondary-custom::after,
.btn-outline-custom::after, .btn-light-custom::after {
  content: ""; position: absolute; top: 0; left: -75%; width: 50%; height: 100%; z-index: -1;
  background: linear-gradient(120deg, transparent, rgba(255,255,255,.35), transparent);
  transform: skewX(-20deg); pointer-events: none;
  animation: btn-shine 3.5s ease-in-out infinite;
}
@keyframes btn-shine { 0%, 60% { left: -75%; } 100% { left: 130%; } }

/* Accessible focus */
.btn-primary-custom:focus-visible, .btn-secondary-custom:focus-visible,
.btn-outline-custom:focus-visible, .btn-light-custom:focus-visible, .btn-icon-custom:focus-visible {
  outline: 3px solid var(--color-secondary); outline-offset: 3px;
}
.btn-primary-custom:disabled, .btn-secondary-custom:disabled,
.btn-outline-custom:disabled, .btn-light-custom:disabled { opacity: .55; cursor: not-allowed; transform: none; box-shadow: none; }

/* Icon button */
.btn-icon-custom {
  display: inline-flex; align-items: center; justify-content: center;
  width: 44px; height: 44px; border-radius: 50%; border: 1px solid var(--color-border);
  background: var(--color-white); color: var(--color-primary); cursor: pointer;
  transition: background-color .3s ease, color .3s ease, transform .3s ease;
}
.btn-icon-custom:hover { background: var(--color-primary); color: var(--color-white); }

.btn-group-custom { display: flex; flex-wrap: wrap; gap: var(--space-3); }

@media (max-width: 575.98px) {
  .btn-primary-custom, .btn-secondary-custom, .btn-outline-custom, .btn-light-custom { padding: 12px 24px; width: 100%; }
}
```

Note: the shine is white, so it is subtle on `.btn-light-custom` (white fill); keep it for consistency. Rules: `<button>` for actions, `<a>` for navigation; icon buttons need `aria-label`; at least 16px gap between buttons; touch target at least 44px.

---

## 4. Cards

Shared base plus variants. Keep shadows light and effects minimal.

```css
.card-custom {
  background: var(--color-white); border: 1px solid var(--color-border);
  border-radius: var(--radius-md); padding: var(--space-4); height: 100%;
  box-shadow: var(--shadow-card); overflow: hidden;
  transition: transform .3s ease, box-shadow .3s ease;
}
.card-custom:hover { transform: translateY(-4px); box-shadow: var(--shadow-card-hover); }
.card-custom__img { display: block; width: 100%; object-fit: cover; border-radius: var(--radius-sm); margin-bottom: var(--space-3); }
.card-custom__title { margin-bottom: var(--space-2); }
.card-custom__meta { font-size: 14px; line-height: 21px; color: var(--color-text-muted); }
```

| Card | Class | Structure / notes |
|---|---|---|
| Service | `.card-service` | 48px icon, H5 title, text, "Learn more" link; padding 32px |
| Feature | `.card-feature` | Icon in `--color-alternate` circle (64px), centered text |
| Team | `.card-team` | Image 1/1, name H6, role (small, muted), social icons; centered |
| Testimonial | `.card-testimonial` | Quote, 56px round avatar, name + role |
| Blog | `.card-blog` | Image 16/9, date + category (small), H5 title, excerpt, read more |
| Pricing | `.card-pricing` | Plan name, price (Outfit 42px), `.list-check`, button; featured variant has orange top border |
| Image | `.card-image` | Image 4/3 with caption overlay on a dark gradient; no padding |

```css
.card-service, .card-pricing { padding: var(--space-5); }
.card-feature, .card-team, .card-testimonial { text-align: center; }
.card-feature__icon { display: inline-flex; align-items: center; justify-content: center; width: 64px; height: 64px; margin-bottom: var(--space-3); border-radius: 50%; background: var(--color-alternate); color: var(--color-primary); }
.card-team .card-custom__img  { aspect-ratio: 1 / 1; }
.card-blog .card-custom__img  { aspect-ratio: 16 / 9; }
.card-image { padding: 0; position: relative; }
.card-image .card-custom__img { aspect-ratio: 4 / 3; margin: 0; border-radius: 0; }
.card-image__caption { position: absolute; inset: auto 0 0 0; padding: var(--space-4) var(--space-3) var(--space-3); color: var(--color-white); background: linear-gradient(transparent, rgba(41,41,41,.8)); }
.card-testimonial__avatar { width: 56px; height: 56px; border-radius: 50%; object-fit: cover; }
.card-pricing--featured { border-top: 4px solid var(--color-secondary); }
.card-pricing__price { font: 700 42px/1.1 var(--font-heading); color: var(--color-primary); }
```

Layouts: 1 column on mobile, 2 on tablet (`col-md-6`), 3 or 4 on desktop (`col-lg-4` / `col-lg-3`). Use `row g-4` with `h-100` cards for equal heights. If a card is wholly clickable, wrap it in a single link and do not nest other links.

---

## 5. Forms

```css
.form-group-custom { margin-bottom: var(--space-3); }
.form-label-custom { display: block; margin-bottom: 6px; font-weight: 600; color: var(--color-primary); }
.form-control-custom, .form-select-custom, .form-textarea-custom {
  width: 100%; padding: 12px 16px; min-height: 48px;
  font: 400 16px/24px var(--font-body); color: var(--color-text);
  background: var(--color-white); border: 1px solid var(--color-border-strong); border-radius: var(--radius-sm);
  transition: border-color .3s ease, box-shadow .3s ease;
}
.form-textarea-custom { min-height: 140px; resize: vertical; }
.form-control-custom::placeholder, .form-textarea-custom::placeholder { color: #767676; opacity: 1; }
.form-control-custom:focus, .form-select-custom:focus, .form-textarea-custom:focus {
  outline: none; border-color: var(--color-primary); box-shadow: 0 0 0 3px var(--color-focus-ring);
}
.form-control-custom.is-valid-custom, .form-select-custom.is-valid-custom, .form-textarea-custom.is-valid-custom { border-color: var(--color-success); }
.form-control-custom.is-invalid-custom, .form-select-custom.is-invalid-custom, .form-textarea-custom.is-invalid-custom { border-color: var(--color-error); }
.form-error-custom   { margin-top: 4px; font-size: 14px; line-height: 21px; color: var(--color-error); }
.form-success-custom { margin-top: 4px; font-size: 14px; line-height: 21px; color: var(--color-success); }
.form-alert-custom   { padding: var(--space-3); border-radius: var(--radius-sm); border: 1px solid; }
.form-alert-custom--success { color: var(--color-success); border-color: var(--color-success); background: #EAF6EF; }
.form-alert-custom--error   { color: var(--color-error);   border-color: var(--color-error);   background: #FDECEC; }

/* Checkbox & radio */
.form-check-custom { display: flex; align-items: flex-start; gap: 10px; }
.form-check-custom input { flex: 0 0 20px; width: 20px; height: 20px; margin-top: 2px; accent-color: var(--color-secondary); }
.form-check-custom input:focus-visible { outline: 3px solid var(--color-secondary); outline-offset: 2px; }
```

```html
<div class="form-group-custom">
  <label class="form-label-custom" for="email">Email</label>
  <input class="form-control-custom is-invalid-custom" type="email" id="email" name="email"
         placeholder="you@example.com" aria-invalid="true" aria-describedby="email-error" required>
  <p class="form-error-custom" id="email-error">Please enter a valid email address.</p>
</div>
```

Rules:
- Input types: `text`, `email`, `tel` (phone), plus `textarea` and `select`. Every input has a `<label for>`; placeholders never replace labels.
- Submit button: `.btn-primary-custom` (`type="submit"`).
- Validate on the client with JavaScript (HTML5 validation attributes plus JS); show error and success messages.
- Mobile: fields stack full width; use two columns (`col-md-6`) from tablet up; 16px font prevents iOS zoom.

---

## 6. Spacing

```css
:root {
  --space-1: 4px;  --space-2: 8px;  --space-3: 16px; --space-4: 24px;
  --space-5: 32px; --space-6: 48px; --space-7: 64px; --space-8: 96px;
  --section-padding: 96px;
  --grid-gap: 24px;
}
@media (max-width: 991.98px) { :root { --section-padding: 72px; } }
@media (max-width: 575.98px) { :root { --section-padding: 48px; --grid-gap: 16px; } }
```

| Item | Standard |
|---|---|
| Section padding | `var(--section-padding)` top and bottom |
| Container side padding | 16px mobile, 24px tablet and up |
| Card padding | 24px (32px for service and pricing) |
| Section heading block | 48px below (`--space-6`) before content |
| Heading bottom margin | 16px |
| Paragraph bottom margin | 16px (last child 0) |
| Between buttons | 16px |
| Grid gap | `--grid-gap` (Bootstrap `g-4`) |

Vertical rhythm: use only the `--space-*` scale; no arbitrary pixel margins.

---

## 7. Container & Grid (Bootstrap 5)

| Layout | Markup |
|---|---|
| Standard container | `.container` (max 1320px at XXL) |
| Wide container | `.container-wide-custom` |
| Full-width section | `<section>` full width with an inner `.container`, or `.container-fluid` for edge-to-edge media |
| Two columns | `.row.g-4 > .col-md-6 ×2` |
| Three columns | `.row.g-4 > .col-md-6.col-lg-4 ×3` |
| Four columns | `.row.g-4 > .col-sm-6.col-lg-3 ×4` |

```html
<section class="section-custom">
  <div class="container">
    <div class="row g-4 align-items-center">
      <div class="col-lg-6">...</div>
      <div class="col-lg-6">...</div>
    </div>
  </div>
</section>
```

```css
.section-custom { padding-block: var(--section-padding); }
.section-custom--light { background: var(--color-bg-light); }
.section-custom--alt   { background: var(--color-bg-alt); }
.section-custom--dark  { background: var(--color-primary); color: var(--color-white); }
.section-custom--dark h1, .section-custom--dark h2, .section-custom--dark h3,
.section-custom--dark h4, .section-custom--dark h5, .section-custom--dark h6 { color: var(--color-white); }
.container-wide-custom { max-width: 1520px; margin-inline: auto; padding-inline: 24px; }
.section-heading-custom { max-width: 720px; margin: 0 auto var(--space-6); text-align: center; }
```

Columns stack on mobile. Use `align-items-center` for text-beside-image rows and `order-*` utilities if mobile order differs.

---

## 8. Radius & Shadows

```css
:root {
  --radius-sm: 6px;
  --radius-md: 12px;
  --radius-lg: 20px;
  --radius-pill: 50px;

  --shadow-card: 0 2px 8px rgba(41,41,41,.06);
  --shadow-card-hover: 0 8px 24px rgba(41,41,41,.10);
  --shadow-button: 0 4px 12px rgba(41,41,41,.15);
  --shadow-dropdown: 0 6px 20px rgba(41,41,41,.12);
  --shadow-modal: 0 16px 48px rgba(41,41,41,.18);
}
```

| Element | Radius | Shadow |
|---|---|---|
| Inputs, small images | `--radius-sm` | none |
| Cards, section images | `--radius-md` | `--shadow-card` |
| Large panels, hero blocks | `--radius-lg` | `--shadow-card` |
| Buttons, badges | `--radius-pill` | `--shadow-button` (hover only) |
| Dropdowns | `--radius-sm` | `--shadow-dropdown` |
| Modals | `--radius-lg` | `--shadow-modal` |

---

## 9. Images & Media

```css
img { max-width: 100%; height: auto; display: block; }
.img-section { width: 100%; border-radius: var(--radius-md); object-fit: cover; aspect-ratio: 4 / 3; }
.img-hero    { width: 100%; height: 100%; min-height: 420px; object-fit: cover; }
.img-card    { width: 100%; object-fit: cover; }
.bg-image-custom { background-size: cover; background-position: center; background-repeat: no-repeat; }
.bg-image-custom--overlay { position: relative; }
.bg-image-custom--overlay::before { content: ""; position: absolute; inset: 0; background: rgba(41,41,41,.6); }
.bg-image-custom--overlay > * { position: relative; }
.video-responsive { position: relative; aspect-ratio: 16 / 9; border-radius: var(--radius-md); overflow: hidden; }
.video-responsive iframe, .video-responsive video { position: absolute; inset: 0; width: 100%; height: 100%; border: 0; }

@media (max-width: 767.98px) { .img-hero { min-height: 280px; } }
```

Rules:
- Use `object-fit: cover` for photos in fixed ratios and `contain` for logos; never stretch.
- Set `width`/`height` attributes or `aspect-ratio` to prevent layout shift.
- `loading="lazy"` and `decoding="async"` for below-the-fold images; do **not** lazy-load the hero (use `fetchpriority="high"` there).
- Prefer WebP/AVIF with a fallback; size images to their display width (use `srcset`/`sizes` where useful).
- Meaningful `alt` text; `alt=""` for decorative images. Only licensed assets, kept in organized folders.

---

## 10. Animation

Libraries: CSS transitions + [AOS](https://michalsnik.github.io/aos/).

```html
<link rel="stylesheet" href="https://unpkg.com/aos@2.3.4/dist/aos.css">
<script src="https://unpkg.com/aos@2.3.4/dist/aos.js"></script>
<script>AOS.init({ duration: 700, easing: 'ease-out', once: true, offset: 80 });</script>
```

| Animation | Markup |
|---|---|
| Fade In | `data-aos="fade"` |
| Fade Up | `data-aos="fade-up"` |
| Fade Down | `data-aos="fade-down"` |
| Slide Left | `data-aos="fade-left"` |
| Slide Right | `data-aos="fade-right"` |
| Zoom In | `data-aos="zoom-in"` |
| Button Shine | Built into button classes (section 3) |
| Card Hover | `.card-custom:hover` (section 4) |

Guidance:
- Stagger with `data-aos-delay="100"`, `"200"`, `"300"`.
- Animate only `transform` and `opacity`; keep durations between .3s and .7s.
- Use fade-up for text/cards, left/right for two-column rows, zoom-in for images and icons. Do not animate every element, and never animate the header or footer.
- Content must stay visible without JavaScript:

```html
<noscript><style>[data-aos] { opacity: 1 !important; transform: none !important; }</style></noscript>
```

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation: none !important; transition: none !important; scroll-behavior: auto !important; }
  [data-aos] { opacity: 1 !important; transform: none !important; }
}
```

The reduced-motion block and the `<noscript>` override are the only places `!important` is acceptable.

---

## 11. Responsive Breakpoints (Bootstrap 5)

| Name | Min width | Bootstrap prefix |
|---|---|---|
| Extra Small | below 576px | (none) |
| Small | 576px | `sm` |
| Medium | 768px | `md` |
| Large | 992px | `lg` |
| Extra Large | 1200px | `xl` |
| XXL | 1400px | `xxl` |

| Area | Mobile (<576) | Tablet (576-991) | Desktop (992+) |
|---|---|---|---|
| Typography | H1 32px | H1 42px | H1 50px |
| Buttons | Full width, 48px tall | Auto width | Auto width |
| Cards | 1 column | 2 columns | 3-4 columns |
| Containers | 16px side padding | 24px | Bootstrap max-width |
| Sections | 48px padding | 72px | 96px |
| Images | Full width, ratio kept | Full width or 50% | Per layout |
| Navigation | Collapsed menu | Collapsed menu | Inline menu |
| Forms | Single column | Single / two column | Two column |

Tablet checks: test **portrait (768x1024)** and **landscape (1024x768)**. Landscape tablets can cross the 992px breakpoint and show the desktop layout, so verify navigation and 3/4-column grids do not overflow or crowd. No horizontal scrolling at any width.

---

## 12. Common UI Components

```css
/* Section label */
.section-label { display: inline-block; margin-bottom: var(--space-2); font: 600 14px/21px var(--font-body); letter-spacing: 2px; text-transform: uppercase; color: var(--color-secondary); }

/* Breadcrumb */
.breadcrumb-custom { display: flex; flex-wrap: wrap; gap: 8px; padding: 0; margin: 0; list-style: none; font-size: 14px; }
.breadcrumb-custom li + li::before { content: "/"; margin-right: 8px; color: var(--color-text-muted); }
.breadcrumb-custom a { color: var(--color-text-muted); text-decoration: none; }
.breadcrumb-custom a:hover { color: var(--color-secondary); }
.breadcrumb-custom [aria-current="page"] { color: var(--color-primary); font-weight: 600; }

/* Badge */
.badge-custom { display: inline-block; padding: 4px 12px; font: 600 12px/18px var(--font-body); border-radius: var(--radius-pill); background: var(--color-alternate); color: var(--color-primary); }
.badge-custom--secondary { background: var(--color-secondary); }

/* Lists */
.list-check { list-style: none; padding: 0; }
.list-check li { position: relative; padding-left: 28px; margin-bottom: 10px; }
.list-check li::before { content: "\2713"; position: absolute; left: 0; color: var(--color-secondary); font-weight: 700; }

/* Accordion (Bootstrap component, colors only) */
.accordion-custom .accordion-button { font: 600 18px/1.3 var(--font-heading); color: var(--color-primary); background: var(--color-white); }
.accordion-custom .accordion-button:not(.collapsed) { background: var(--color-bg-alt); color: var(--color-primary); box-shadow: none; }
.accordion-custom .accordion-button:focus-visible { box-shadow: 0 0 0 3px var(--color-focus-ring); }

/* Tabs (Bootstrap component, colors only) */
.tabs-custom .nav-link { font-weight: 600; color: var(--color-text-muted); border: 0; border-bottom: 3px solid transparent; border-radius: 0; }
.tabs-custom .nav-link:hover { color: var(--color-primary); }
.tabs-custom .nav-link.active { color: var(--color-primary); background: transparent; border-bottom-color: var(--color-secondary); }

/* Call to action */
.cta-custom { padding-block: var(--space-7); background: var(--color-primary); color: var(--color-white); text-align: center; }
.cta-custom h2 { color: var(--color-white); }
.cta-custom p { max-width: 640px; margin-inline: auto; }

/* Back to top */
.back-to-top { position: fixed; right: 20px; bottom: 20px; width: 44px; height: 44px; border-radius: 50%; border: 0; background: var(--color-primary); color: var(--color-white); box-shadow: var(--shadow-button); opacity: 0; visibility: hidden; transition: opacity .3s ease, visibility .3s ease; z-index: 99; }
.back-to-top.is-visible { opacity: 1; visibility: visible; }
.back-to-top:focus-visible { outline: 3px solid var(--color-secondary); outline-offset: 3px; }

/* Social icons */
.social-icons { display: flex; gap: 10px; list-style: none; padding: 0; margin: 0; }
.social-icons a { display: inline-flex; align-items: center; justify-content: center; width: 40px; height: 40px; border-radius: 50%; background: var(--color-white); border: 1px solid var(--color-border); color: var(--color-primary); transition: background-color .3s ease, border-color .3s ease; }
.social-icons a:hover { background: var(--color-secondary); border-color: var(--color-secondary); }
```

- **Breadcrumb markup:** `<nav aria-label="Breadcrumb"><ol class="breadcrumb-custom">...</ol></nav>`, with `aria-current="page"` on the last item.
- **Back to top:** `<button class="back-to-top" aria-label="Back to top">`; toggle `.is-visible` via scroll after ~300px.
- **Social icons:** every link needs `aria-label` (for example "Facebook") and `rel="noopener"` with `target="_blank"` if opening externally.
- **Testimonials:** use `.card-testimonial`; **section heading block** uses `.section-label` + H2.
- Accordion and tabs keep Bootstrap's keyboard support (arrow keys, Enter, Space).

---

## 13. Accessibility

- Text contrast at least 4.5:1 (large text 3:1). Body `#515151` on `#FAF9F6` passes.
- Visible `:focus-visible` outline on every interactive element; never `outline: none` without a replacement.
- Semantic HTML: `header`, `nav`, `main`, `section`, `footer`; one `h1` per page; headings in order.
- Buttons and links have clear text or `aria-label`; avoid "click here".
- Everything is keyboard operable; provide a "skip to content" link.
- Every form control has a `<label>`; errors use `aria-describedby` and `aria-invalid`.
- Respect `prefers-reduced-motion` (section 10).
- Minimum touch target 44x44px.
- Do not rely on color alone to convey state (pair error color with text or icon).

---

## 14. CSS Architecture

Suggested file order in `css/style.css` (or split files loaded in this order):

1. Global variables (`:root`)
2. Base / reset and typography classes
3. Layout classes (`.section-custom`, `.container-wide-custom`)
4. Button classes
5. Card classes
6. Form classes
7. Common components
8. Animation classes
9. Responsive utilities (media queries last)

Rules:
- Unique, reusable, kebab-case class names with the `-custom` suffix or a component prefix (`card-`, `btn-`, `form-`); BEM-style `__` for children and `--` for modifiers.
- Reuse existing classes before writing new ones; no duplicate CSS.
- No `!important` (except the reduced-motion and no-JS overrides), no inline CSS unless unavoidable, no bare global selectors beyond base elements.
- Do not overwrite existing header and footer styles; scope new rules to components. Page-specific styles go in a separate file (for example `css/pages/about.css`).
- Use variables instead of hardcoded colors, sizes and spacing.

---

## 15. Development Rules

1. Always read `CLAUDE.md` before starting development.
2. Follow `DESIGN_SYSTEM.md` for all UI components.
3. Reuse existing components wherever possible.
4. Do not create different button styles on different pages without need.
5. Keep typography, colors, spacing and animations consistent.
6. Never break existing header and footer functionality.
7. Every component must be responsive.
8. Keep the design professional, modern and clean.
