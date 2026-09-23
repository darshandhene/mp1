# Darshan Dhene — Portfolio (CS 409 MP1)

A single-page personal portfolio built with plain HTML, SCSS and vanilla ES6 (no UI/JS frameworks or libraries). It presents an about section, a project carousel, a work-experience grid with detail modals, an embedded video and contact/social links, all on one scrolling page with a sticky, resizing navbar and scroll-position highlighting.

- **Live site:** https://darshandhene.github.io/mp1/
- **Repository:** https://github.com/darshandhene/mp1

## Run locally

```bash
npm install
npm start      # dev server at http://localhost:8080
npm run build  # build the static site into build/
```

## Requirement checklist

| Requirement | Where it's implemented | How |
|---|---|---|
| Layout / stripes | `src/css/_variables.scss`, `src/css/_about.scss`, `src/css/_modal.scss` (`.work`) | Sections alternate between `$color-bg` and `$color-surface` backgrounds, producing horizontal "stripes" down the page. |
| Sticky navbar | `src/css/_nav.scss` (`.navbar`) | `position: fixed; top: 0` keeps the navbar pinned above `<main>` at all scroll positions. |
| Position indicator | `src/js/nav.js` (`updateActiveLink`) | On scroll, finds the section whose top is above the navbar's bottom edge and toggles `.nav-link--active` on the matching link, which grows an underline via `_nav.scss`. |
| Navbar resizing | `src/js/nav.js` (`updateNavSize`), `src/css/_nav.scss` (`.navbar--shrunk`) | Past `SHRINK_AT = 50px` of scroll, `.navbar--shrunk` is toggled, animating height/background/font-size with CSS transitions. |
| Smooth scrolling | `src/js/nav.js` (`smoothScrollTo`, `onNavClick`) | Custom `requestAnimationFrame` loop eases scroll position with a cubic ease-in-out over 700ms when a nav link is clicked. |
| Carousel | `src/js/carousel.js`, `src/css/_carousel.scss` | A track of slides is translated by 100% increments via `transform: translateX`; prev/next arrows, generated dot indicators, and arrow-key navigation all call `goTo(i)`, which wraps at both ends. |
| Multi-column layout | `src/css/_about.scss` (`.about__grid`), `src/css/_modal.scss` (`.work__grid`) | `display: grid; grid-template-columns: repeat(3, 1fr)` for the About cards and Experience cards. |
| Centering | `src/css/_mixins.scss` (`flex-center`), used in `.hero`, `.footer__inner`, `.carousel__dots`, `.modal` | A reusable flexbox-centering mixin; `.container` also centers content horizontally with `margin: 0 auto`. |
| Responsiveness | `src/css/_mixins.scss` (`respond-to`), applied throughout `src/css/*.scss` | A `$breakpoints` map (tablet 1024px, mobile 768px, small 600px) drives `@media (max-width: …)` rules that reflow the grid columns, navbar spacing, carousel padding, etc. |
| Fixed background image | `src/css/_hero.scss` (`.hero`) | `background: linear-gradient(...), url('../assets/images/hero.jpg') ... ; background-attachment: fixed;` — the hero photo stays fixed while the page scrolls over it. |
| Modal | `src/js/modal.js`, `src/css/_modal.scss` (`.modal`) | Clicking a work card opens a `role="dialog"` overlay (`openDialog`/`closeDialog`), closable via the × button, Escape key, or backdrop click, with focus management and a fade/scale transition. |
| Video | `src/index.html` (`#video`), `src/css/_video.scss` | A native `<video controls>` element embeds a local MP4 with a rounded, shadowed wrapper. |
| SCSS features | `src/css/_variables.scss`, `_mixins.scss`, `main.scss` | Variables, a `$breakpoints` Sass map with `map.get()`, `@mixin`/`@include` (`flex-center`, `respond-to`, `section-padding`, `card`), nesting with `&`, and `@use` partials assembled in `main.scss`. |
| CSS3 animations | `src/css/_base.scss` (`@keyframes fadeInUp`), `src/css/_hero.scss` | Hero content staggers in with `animation: fadeInUp … forwards` and per-element `animation-delay`; respects `prefers-reduced-motion`. |
| Vector icons | `src/index.html` (`<i class="fa-solid …">` throughout), Font Awesome 6.5.2 via cdnjs | Icons for About, Projects, Experience, Contact and social links. |
| Social icons | `src/index.html` (`.social-icons` in the footer) | GitHub, LinkedIn and email icons linking out to the author's profiles. |

## Project structure

```
src/
├── index.html          # single-page markup: nav, hero, about, projects, work, video, contact, modals
├── index.js             # webpack entry point; imports HTML, main.scss and main.js
├── assets/              # images and video used by the page
├── js/
│   ├── main.js           # bootstraps nav, carousel and modal modules on load
│   ├── nav.js             # sticky/resizing navbar, active-link tracking, smooth scroll
│   ├── carousel.js        # project carousel (slides, dots, arrow/keyboard navigation)
│   └── modal.js           # experience-card dialogs (open/close, focus, reduced-motion)
└── css/
    ├── main.scss          # entry point that @uses all partials
    ├── _variables.scss    # colors, fonts, spacing, breakpoints map
    ├── _mixins.scss       # respond-to, flex-center, section-padding, card
    ├── _base.scss         # resets, typography, buttons, tags, keyframes
    ├── _nav.scss           # navbar styles
    ├── _hero.scss          # hero section + fixed background
    ├── _about.scss         # about grid
    ├── _carousel.scss      # carousel styles
    ├── _modal.scss         # work grid + modal dialog styles
    ├── _video.scss         # video wrapper
    └── _footer.scss        # contact + footer + social icons
```

## Sources

MDN Web Docs, consulted while implementing scroll/animation and layout behavior:
- [Element.getBoundingClientRect()](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect)
- [Window.requestAnimationFrame()](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame)
- [Window.scrollTo()](https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollTo)
- [CSS grid layout](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout)
- [background-attachment](https://developer.mozilla.org/en-US/docs/Web/CSS/background-attachment)
- [CSS transitions](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_transitions)
- [@keyframes](https://developer.mozilla.org/en-US/docs/Web/CSS/@keyframes)
- [prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)
- [Element: transitionend event](https://developer.mozilla.org/en-US/docs/Web/API/Element/transitionend_event)
- [ARIA: dialog role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/dialog_role)

Other documentation and libraries:
- [Sass documentation](https://sass-lang.com/documentation/) — `@use`, mixins, maps
- [Font Awesome 6.5.2](https://fontawesome.com/) via [cdnjs](https://cdnjs.com/libraries/font-awesome)
- [Google Fonts](https://fonts.google.com/) — Inter and Poppins
- [CS 409 MP1 course template](https://github.com/cs409-fa25/mp1)

Media:
- Hero photo: personal photo of the author.
- Video: Stock video from Pexels (ID 16489854), https://www.pexels.com/video/red-train-passing-through-modern-cityscape-38799081/— free to use under the Pexels license

## AI usage

Claude Code (Anthropic) was used to plan the work, generate and review the HTML/SCSS/JS, and debug responsive behavior across breakpoints. The author reviewed every change, tested the site in the browser at all required resolutions, and edited the generated code before committing. Full chat logs are in `chatlogs/`; details are in [AI_USAGE.md](./AI_USAGE.md).
