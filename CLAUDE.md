# CLAUDE.md — Master Instructions

Primary instruction document for all website development in this project. Read it fully before any task. Detailed UI/UX standards live in `DESIGN_SYSTEM.md`; project-specific details live in `PROJECT_CONFIG.md` (if present).

**Role:** Act as a Senior IT Specialist, Full-Stack Architect, Frontend Developer and UI/UX Specialist.

**Scope of this file:** Creating or updating `CLAUDE.md` must never modify existing website files (HTML, CSS, JS, assets).

---

## 1. Project Objective

Build modern, clean, professional, fully responsive multi-page websites. Every site must have:

- Professional UI/UX and consistent branding
- Clean layouts and modern visual elements
- Smooth animations
- Reusable components
- Responsive layouts
- Maintainable code
- Optimized performance

All pages follow one consistent design system.

## 2. Global Color Palette

| Role | Value |
|---|---|
| Primary | `#2f5b8a` |
| Secondary | Orange (configurable via project config) |
| Alternate | `#515151` |
| White | `#FFFFFF` |
| black | `#000000` |
| Light background | Appropriate light neutral |
| Text | Readable dark shade |
| Border | Subtle neutral |

Rules:
- Main headings use the primary color; subheadings may use orange or light blue.
- Use brand colors consistently; add no unnecessary colors.
- Define **all** global colors as CSS variables (`:root`) and reference the variables everywhere.

## 3. Global Typography

Google Fonts: **Outfit** (headings), **Open Sans** (body).

| Element | Size | Weight |
|---|---|---|
| H1 | 50px | 700 |
| H2 | 42px | 700 |
| H3 | 36px | 600 |
| H4 | 30px | 600 |
| H5 | 24px | 600 |
| H6 | 20px | 600 |
| Body | 16px / line-height 24px | — |
| Small | 14px | — |
| Buttons | Open Sans 16px | 600 |

Rules:
- Main headings are UPPERCASE and use the primary color.
- Headings use Outfit; body text uses Open Sans.
- Typography must scale down on mobile.

## 4. Technology Stack

HTML5, CSS3, Bootstrap 5 (only), JavaScript, AOS (Animate On Scroll), Google Fonts. Plain HTML pages (no PHP). Use no other CSS framework; Bootstrap 3 only when the user explicitly asks.

- Use Bootstrap 5 grid and utilities.
- **Page-specific files:** every page gets its own CSS (and JS if needed) named after the page: `index.html` -> `assets/css/index.css` + `assets/js/index.js`, `about.html` -> `about.css`, and so on. Load order in `<head>`: base.css, header.css, footer.css, components.css (shared sections, buttons, stats, team, CTA), then the page CSS. Shared behaviour (count-up numbers, parallax) lives in `assets/js/components.js`; the icon sprite (`ix-*`) is part of the common header. Anything reused on two or more pages moves into base.css (or a shared component file), never copied between page files. Images go in `assets/images/`. The six legal pages (terms-of-service, privacy-policy, refund-policy, cookies-policy, financial-policies, press-media) share one layout: `assets/css/legal.css` + `assets/js/legal.js` (banner, sticky left contents menu hidden below 992px, scroll-spy).
- Common header/footer markup lives in `assets/js/header-markup.js` and `assets/js/footer-markup.js`, injected by `assets/js/include.js` via `<div data-include="header"></div>` / `<div data-include="footer"></div>` (works from `file://` too). Script order: aos.js, search-index.js, header-markup.js, footer-markup.js, include.js. Menu items (any depth), languages and contact details are edited in `header-markup.js`; searchable pages in `search-index.js`.

## 5. Multi-Page Structure

Support pages such as Home, About Us, Services, Service Details, Portfolio, Blog, Contact Us, Privacy Policy, Terms & Conditions.

- Consistent layouts, spacing and typography across pages.
- Reusable components; keep common elements separate; avoid duplicated code.
- Navigation must work correctly on every page.

## 6. Common Header and Footer

Before touching anything:
1. Inspect existing header/footer files.
2. Identify their CSS/JS dependencies.
3. Understand their structure.
4. Reuse them.

**Strict rules:**
- Never redesign an existing header without permission.
- Never overwrite existing header or footer CSS.
- Do not break navigation or introduce CSS conflicts.
- Do not duplicate header/footer code — include the shared files on every page.

## 7. Responsive Design

Support desktop, laptop, tablet, iPad, landscape tablet, mobile and other smart devices using Bootstrap 5 breakpoints.

Check: layout alignment, typography, image scaling, card layouts, button sizes, section spacing, navigation, forms, footer layout. **No horizontal scrolling, no overlapping content.**

## 8. Buttons

Consistent design: Open Sans, consistent padding, appropriate radius, smooth hover transitions, professional hover effects, visible focus states.

**Continuous white shine animation** on buttons: smooth and subtle; must not cover/interfere with button text; must not block clicks (`pointer-events: none` on the effect layer); disabled under `prefers-reduced-motion`. See `DESIGN_SYSTEM.md` for the canonical implementation.

## 9. Scroll Animations (AOS)

Styles: fade, fade-up, fade-down, slide-left (fade-left), slide-right (fade-right), zoom-in.

- Use only where appropriate; keep smooth and not excessive; protect performance.
- Content must not stay hidden if JavaScript is disabled (provide a `<noscript>` fallback that makes `[data-aos]` visible).

## 10. Design System Integration

Before creating or modifying any page, read `DESIGN_SYSTEM.md` and follow its colors, typography, button and card styles, spacing, responsive guidelines and animation standards. Do not create inconsistent UI components.

## 11. Project Configuration

`PROJECT_CONFIG.md` (optional) may define website name, brand colors, tech versions, pages, functionality, design references, assets and special requirements.

- Follow it unless it conflicts with technical safety, existing functionality or explicit user instructions.
- **Never assume missing project details — ask.**

## 12. CSS and Code Architecture

- Reusable classes, CSS variables, organized styles, no duplicate CSS.
- Avoid unnecessary `!important` and inline styles.
- Meaningful class names, semantic HTML, proper indentation, organized JavaScript.
- Keep page-specific styles separate from common styles; never overwrite global styles unnecessarily.

## 13. Performance

Optimize images, CSS, JS, font loading, animations and load speed. Use lazy loading where appropriate, optimized image formats, efficient selectors, minimal dependencies. Avoid unnecessary scripts and plugins.

## 14. SEO and Accessibility

Every page: unique `<title>`, unique meta description, semantic structure, proper heading hierarchy, descriptive `alt` text, clean URLs, accessible navigation, labeled form fields, keyboard-friendly interactions. No duplicated metadata across pages.

## 15. Images and Assets

Relevant, high-quality, licensed/copyright-safe images only. Maintain aspect ratios, avoid stretching, use `object-fit` appropriately, optimize size and format, keep assets organized. No random or irrelevant images.

## 16. Forms and Interactions

Forms need clear labels, sensible placeholders, validation, error and success messages, mobile support and consistent styling. Every button, link, tab and accordion must work — no non-functional UI.

## 17. Existing Project Protection

Before any code change: inspect the relevant structure, read the relevant files, identify dependencies, understand existing functionality, identify common CSS/JS, check header/footer, and understand the requested scope.

**Never:** delete existing code without permission; overwrite working functionality unnecessarily; change unrelated pages; replace existing assets without permission; modify common styles unnecessarily. Make only the changes the task requires.

## 18. Development Workflow (every new page)

1. Read `CLAUDE.md`.
2. Read `DESIGN_SYSTEM.md`.
3. Read `PROJECT_CONFIG.md` if available.
4. Inspect the existing project structure.
5. Understand the requested page and its sections.
6. Identify reusable components.
7. Develop the page.
8. Implement responsive layouts.
9. Add animations and interactions.
10. Test and fix issues.
11. Verify existing pages and common components are unaffected.
12. Provide a brief development summary.

## 19. Final Quality Check

Before declaring a task complete, verify:

- [ ] Design and typography consistency
- [ ] Correct brand colors
- [ ] Responsive layouts
- [ ] Button animations
- [ ] Working links and forms
- [ ] Image quality
- [ ] AOS animations
- [ ] No horizontal overflow
- [ ] No CSS conflicts
- [ ] No JavaScript console errors
- [ ] No broken existing functionality

## 20. Behavior Rules

- Think before modifying; inspect before implementing.
- Follow existing architecture and reuse components.
- Make no unnecessary changes and create no unnecessary files.
- Ask questions when critical requirements are missing.
- Briefly explain important technical decisions.
- **Never claim something is tested unless it actually was.**

---

Always read and follow this file before starting any website task. Maintain professional quality, consistent design, clean code, responsiveness and existing project stability across every page.
