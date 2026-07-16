# Bytant Innovative Group Website

This project is a static startup information website for Bytant Innovative Group and Team Bytant. It presents the group's identity, mission, products, open source direction, services, values, culture, operating principles, and contact flows.

The build uses plain HTML, CSS, and JavaScript:

- `index.html` contains the site structure, content, sections, buttons, links, and modals.
- `style.css` contains the brand system, responsive layout, animation, carousel, card, modal, and mobile styles.
- `script.js` contains modal behavior, WhatsApp form handling, reveal-on-scroll animation, and the product carousel.
- `assets/img/` contains logo assets and product screenshots.

## Asset Map

Main brand assets:

- `assets/img/hero logo.png` is used in the navbar brand mark.
- `assets/img/bytant IG.png` is used in the hero logo disc.
- `assets/img/team bytant.png` is used in the Team Bytant section and footer.

Product screenshots:

- `assets/img/products/govflow.png` is the screenshot for GovFlow.
- `assets/img/products/apomuden-triage.png` is the screenshot for Apomuden Triage.
- `assets/img/products/crib-africa.png` is the screenshot for Crib Africa.

The product screenshots were captured from the official product homepages and are shown in the Products carousel.

## External Dependencies

The site uses CDN links in `index.html`:

- Google Fonts: `Outfit` and `Space Grotesk`
- Font Awesome 6.5.2 for icons

There is no build step or package manager requirement for the site itself. Opening `index.html` or serving the folder with a simple static server is enough.

## Brand System

The brand colors are defined in `:root` inside `style.css`.

Important variables:

- `--ink` and `--night` define deep navy tones.
- `--paper` and `--paper-soft` define white and soft background surfaces.
- `--text` and `--muted` define main and secondary text colors.
- `--violet`, `--purple`, `--blue`, and `--cyan` come from the Team Bytant logo direction.
- `--brand-gradient` is the main gradient used across buttons, modal marks, borders, and carousel dots.
- `--line` and `--shadow` define the soft border and shadow system.

The site originally used a dark African-inspired color palette, but it was changed to a cleaner white interface with purple, violet, and blue gradients based on the Team Bytant logo.

## Page Structure

The main page is organized inside `index.html` as follows:

1. Background motion layer
2. Fixed navigation bar
3. Hero section
4. Mission section
5. Identity section
6. Products carousel
7. Open Source section
8. Services section
9. Values section
10. Culture section
11. Operating System section
12. Constitutional Doctrines section
13. Team Bytant section
14. Footer
15. Modals
16. JavaScript include

Each major section uses the shared `.section` class for width and spacing. Some sections add specialized layout classes such as `.split-section`, `.identity-section`, `.services-section`, `.method-section`, and `.team-section`.

## Navigation

The navigation bar is built in the `<header class="site-header">`.

The brand logo links back to `#home`:

```html
<a class="brand" href="#home" aria-label="Bytant home">
  <img src="assets/img/hero logo.png" alt="Bytant Innovative Group logo">
</a>
```

The internal navigation links target section IDs:

- `#mission`
- `#identity`
- `#products`
- `#open-source`
- `#services`
- `#values`
- `#team`

The navbar also includes:

- `Buy us coffee`, which opens the support modal.
- `Contact`, which opens the contact modal.

The nav buttons work through IDs:

- `help-us-btn`
- `nav-cta-btn`

These are connected in `script.js` with event listeners.

## Background and Motion Layer

The first element inside `<body>` is:

```html
<div class="motion-field" aria-hidden="true">
  <span class="glyph glyph-one"></span>
  <span class="glyph glyph-two"></span>
  <span class="glyph glyph-three"></span>
  <span class="orbit"></span>
</div>
```

This is decorative and hidden from screen readers using `aria-hidden="true"`.

The CSS creates animated geometric accents with:

- `.glyph`
- `.glyph-one`
- `.glyph-two`
- `.glyph-three`
- `.orbit`

The keyframe animations used include:

- `drift`
- `spinFloat`
- `breathe`

## Hero Section

The hero section introduces Bytant Innovative Group.

It contains:

- Eyebrow text: `African startup studio for bold builders`
- Main heading: `Bytant Innovative Group`
- Short description
- Two action buttons
- Animated logo stage

The action buttons link to:

- `#mission` for `Explore the mission`
- `#products` for `View innovations`

The hero visual uses:

```html
<div class="hero-stage reveal">
  <div class="logo-disc">
    <img src="assets/img/bytant IG.png" alt="Bytant Innovative Group logo">
  </div>
  <div class="pulse-ring ring-one"></div>
  <div class="pulse-ring ring-two"></div>
  <div class="data-card card-top">...</div>
  <div class="data-card card-bottom">...</div>
</div>
```

The `.logo-disc` creates a circular frame with the brand gradient. The image is set to `object-fit: contain` so the full logo is visible. The `.pulse-ring` elements add motion, and `.data-card` elements provide small floating messages.

## Mission Section

The Mission section uses:

```html
<section id="mission" class="section split-section">
```

It is split into:

- Text content on one side
- A four-card grid on the other

The cards explain:

- North Star
- Africa first
- Infrastructure
- Responsible innovation

The layout is controlled by:

- `.split-section`
- `.value-grid`
- `.value-grid article`

On mobile, `.split-section` becomes a single-column layout through the media query at `max-width: 860px`.

## Identity Section

The Identity section uses:

```html
<section id="identity" class="section identity-section">
```

It explains the brand architecture:

- Bytant Innovative Group as the company
- Team Bytant as the innovation team
- `From Team Bytant` as the product attribution style

Cards are created with:

- `.identity-grid`
- `.identity-card`

The `.identity-section` class adds a full-width tinted background while keeping content aligned with the main page width.

## Products Carousel

The Products section is connected to the nav link `#products` and the hero button `View innovations`.

It uses:

```html
<section id="products" class="section">
```

The carousel wrapper is:

```html
<div class="product-carousel reveal" aria-label="Bytant products carousel">
```

The carousel has:

- Previous button: `#product-prev`
- Next button: `#product-next`
- Track: `#product-track`
- Dot container: `#product-dots`

Each product is an `<article class="product-card">`.

Current product cards:

1. GovFlow
   - URL: `https://govflowgh.vercel.app/`
   - Screenshot: `assets/img/products/govflow.png`
   - Category: Government services

2. Apomuden Triage
   - URL: `https://apomudentriage.help/`
   - Screenshot: `assets/img/products/apomuden-triage.png`
   - Category: Health guidance

3. Crib Africa
   - URL: `https://cribafrica.space/`
   - Screenshot: `assets/img/products/crib-africa.png`
   - Category: Creative marketplace

### How The Carousel Works

The carousel CSS uses a flex track:

```css
.product-track {
  display: flex;
  transition: transform 420ms ease;
}

.product-card {
  flex: 0 0 100%;
}
```

This means each product card takes the full width of the viewport. JavaScript moves the track with:

```js
track.style.transform = `translateX(-${index * 100}%)`;
```

The carousel is initialized by `setupProductCarousel()` in `script.js`.

The function:

- Finds the track, buttons, dots container, and slides.
- Creates one dot per product card.
- Moves to the previous or next product with wrapping.
- Updates active dot state with `.is-active`.
- Supports mobile swipe gestures using `touchstart` and `touchend`.

### Adding More Products

To add another product:

1. Add a screenshot to `assets/img/products/`.
2. Add another `<article class="product-card">` inside `#product-track`.
3. Include the screenshot, product name, description, category, and homepage link.

The JavaScript automatically creates a new dot because it reads all `.product-card` elements inside `#product-track`.

No JavaScript changes are needed when adding more products.

## Open Source Section

The Open Source section uses:

```html
<section id="open-source" class="section open-source-section">
```

It explains how Team Bytant can release:

- Shared tools
- Documented experiments
- Responsible open source work

It includes a GitHub button:

```html
<a class="ghost-btn section-cta" href="https://www.github.com/bytant innovative group" target="_blank" rel="noopener">
  <i class="fa-brands fa-github"></i>
  View GitHub
</a>
```

The section uses `.identity-grid` and `.identity-card` for its three cards.

## Services Section

The Services section uses:

```html
<section id="services" class="section services-section">
```

It explains that Bytant builds and designs digital products for others as well as building its own products.

The section includes two main CTAs:

- `Talk to us`, which opens WhatsApp with a prefilled message.
- `View all services`, which opens the Services modal.

The button row is styled with:

- `.services-actions`
- `.section-cta`

The four summary service cards cover:

- Product design
- Custom builds
- Quality delivery
- Mission fit

The full service list lives in the Services modal.

## Values Section

The Values section uses:

```html
<section id="values" class="section">
```

It includes a chip cloud with these values:

- Build First
- Learn Relentlessly
- Radical Ownership
- Team Above Ego
- Excellence by Default
- Integrity Always
- User First
- Continuous Improvement

The chip cloud is styled by `.values-cloud`.

Below the chips are three cards explaining:

- Research before building
- Simple, lasting systems
- Trust as an asset

## Culture Section

The Culture section uses:

```html
<section id="culture" class="section culture-section">
```

It contains three columns:

- Culture
- Leadership
- Membership

The layout is controlled by:

- `.culture-columns`
- `.culture-card`

On smaller screens, this becomes one column.

## Operating System Section

The Operating System section uses:

```html
<section id="method" class="section method-section">
```

It describes the Bytant way of building through a four-part timeline:

- Purpose
- Governance
- Ethics
- Impact

The timeline is styled with:

- `.timeline`
- `.timeline div`
- `.timeline span`

On mobile, the timeline becomes a vertical list.

## Constitutional Doctrines Section

This section presents Bytant's doctrine statements:

- Build for generations, not trends.
- Solve root causes rather than symptoms.
- Trust is our greatest asset.
- Every member is a leader through action.
- Technology should remain accessible, secure, and human-centered.
- Success is measured by lasting impact.

The section uses:

- `.doctrine-section`
- `.doctrine-list`

The doctrine list is a two-column grid on desktop and a single column on mobile.

## Team Bytant Section

The Team section uses:

```html
<section id="team" class="section team-section">
```

It includes:

- Team Bytant logo
- Explanation of Team Bytant as the engineering, innovation, and research force inside Bytant
- BOS, version, and constitution metadata

The layout is controlled by:

- `.team-section`
- `.team-logo`
- `.stats-row`

## Footer

The footer uses:

```html
<footer class="site-footer">
```

It includes:

- Team Bytant logo
- `From Team Bytant`
- Motto line
- Copyright line: `Copyright 2026 Bytant Innovative Group.`
- Social links

The footer social links currently point to:

- X
- GitHub
- LinkedIn

The footer is responsive and becomes a stacked grid on small screens.

## Modals

The site has six modals:

1. Buy us coffee modal
2. Donate modal
3. Share idea modal
4. Suggestion modal
5. Contact modal
6. Services modal

All modals use the base `.modal` class and are hidden by default with `.hidden`.

The modal open/close behavior is handled by:

```js
function toggleModal(modal, shouldOpen) {
  if (!modal) return;
  modal.classList.toggle("hidden", !shouldOpen);
}
```

Each modal is wired with:

```js
function wireModal(modalId, closeId) { ... }
```

This helper:

- Finds the modal element.
- Finds the close button.
- Closes the modal when the close button is clicked.
- Closes the modal when the backdrop is clicked.

Escape key support is added at the bottom of `script.js`.

### Buy Us Coffee Modal

Triggered by the navbar button:

```html
<button class="ghost-btn" id="help-us-btn" type="button">Buy us coffee</button>
```

The modal contains three actions:

- Buy us coffee
- Share an idea
- Leave a suggestion

These use `data-help-action` attributes. JavaScript reads the action and opens the correct modal.

### Donate Modal

The Donate modal displays:

- Number: `(233) 507 410 361`
- Name: `KELVIN OMABOE`
- Network: `VODAFONE`

It is opened when the user chooses `Buy us coffee` in the support modal.

### Share Idea Modal

The Share Idea modal includes:

- Name
- Email
- Anonymous checkbox
- Idea title
- Idea details

When submitted, JavaScript builds a WhatsApp message and opens:

```text
https://wa.me/233507410361
```

The anonymous checkbox is handled by `setupAnonymousToggle()`.

### Suggestion Modal

The Suggestion modal includes:

- Optional name
- Optional email
- Anonymous checkbox
- Suggestion textarea

It also sends the content through WhatsApp using `openWhatsApp()`.

### Contact Modal

Triggered by:

```html
<button class="primary-btn" id="nav-cta-btn" type="button">Contact</button>
```

It includes:

- WhatsApp contact
- Email contact
- Explore services link

The services link closes the modal and scrolls to `#services`.

### Services Modal

Triggered by:

```html
<button class="ghost-btn section-cta" id="view-services-btn" type="button">
```

The modal lists:

- Digital platforms and product development
- Graphic design
- AI video creation
- SEO
- Brand identity creation
- Website and app design
- Creative campaign assets
- Technical consulting and prototyping

It also includes a WhatsApp CTA for service inquiries.

## WhatsApp Integration

All WhatsApp messaging uses the number:

```text
233507410361
```

The central helper in `script.js` is:

```js
function openWhatsApp(message) {
  const phone = "233507410361";
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener");
}
```

This is used by:

- Idea form
- Suggestion form

Static WhatsApp links are also used in:

- Services section
- Contact modal
- Services modal

## Reveal Animation

Many elements use the `.reveal` class in the HTML.

JavaScript watches them with `IntersectionObserver`:

```js
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.16 });
```

The CSS starts `.reveal` elements invisible and moved down:

```css
.reveal {
  opacity: 0;
  transform: translateY(28px);
}
```

When `.is-visible` is added, the element fades and slides into place.

## Responsive Design

Responsive behavior is handled in three main media queries:

### `max-width: 1080px`

This tightens the nav spacing and font size.

### `max-width: 860px`

This changes major grids into one column:

- Hero
- Split sections
- Services
- Team
- Product cards
- Venture grids
- Identity grids
- Culture columns
- Timeline

It also hides `.nav-links` so the navbar remains clean on tablets and phones.

### `max-width: 560px`

This tunes phone layouts:

- Smaller header
- Smaller logo
- Full-width hero buttons
- Reduced section padding
- Smaller headings
- Smaller hero logo stage
- Smaller floating data cards
- One-column forms, footer, values, and services list

### `max-width: 380px`

This adds extra compression for very narrow screens:

- Smaller buttons
- Smaller brand logo
- Smaller hero logo disc
- Narrower data cards

## Accessibility Notes

Implemented accessibility details:

- Navigation uses `aria-label="Primary navigation"`.
- Decorative background uses `aria-hidden="true"`.
- Modals use `role="dialog"` and `aria-modal="true"`.
- Modal headings are connected through `aria-labelledby`.
- Buttons have clear text labels or `aria-label` values.
- Product screenshots include descriptive `alt` text.
- Product carousel controls include `aria-label`.
- Carousel dots include `aria-current` when active.

## Development and Preview

Because the site is static, it can be opened directly in the browser. For a more realistic local preview, run a static server from the project root:

```powershell
python -m http.server 8080 --bind 127.0.0.1
```

Then visit:

```text
http://127.0.0.1:8080/index.html
```

## Verification

During development, `script.js` was checked with:

```powershell
node --check script.js
```

The local server was also checked by requesting:

- `index.html`
- `style.css`
- `script.js`
- Product screenshot assets

## Notes for Future Updates

When adding a new section:

1. Add a `<section>` with a unique `id`.
2. Add a nav link if it should be reachable from the navbar.
3. Use the shared `.section` class for consistent spacing.
4. Add `.reveal` to elements that should animate on scroll.
5. Add responsive CSS if the section introduces a new grid or layout.

When adding a new modal:

1. Add a modal block with `class="modal hidden"`.
2. Give it a unique ID.
3. Give the close button a unique ID.
4. Register it in `script.js` with `wireModal(modalId, closeId)`.
5. Add it to the Escape key close list if needed.

When adding a new product:

1. Save the product screenshot in `assets/img/products/`.
2. Add a new `.product-card` inside `#product-track`.
3. Include product name, category, screenshot, description, and homepage link.
4. No JavaScript changes are required because dots are generated automatically.
