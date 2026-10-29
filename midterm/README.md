# CSC336 Midterm — Tesla Vehicles

**Student:** Hussnain Ali
**Registration number:** SP24-BCS-156
**N:** 56
**Breakpoint (BP):** 656px
**Accent hue (H):** 32°
**K:** 5

## Files changed

- `index.html` — added the five-column desktop mega-menu, mobile `<details>` accordion groups, cart panel markup, and `script.js` link.
- `styles.css` — added the 656px responsive menu rules, accent color, mega-menu layering, mini-cart, and HTML validation styles.
- `checkout.html` — added the HTML5-only checkout form with Contact and Delivery fieldsets.
- `script.js` — added the plain JavaScript cart badge, mini-cart, `reduce()` total, remove action, and per-product limit.
- `README.md` — documented the roll-number values, changes, and AI tool use.
- `midterm/SP24-BCS-156-midterm.pdf` — submission evidence PDF.

## Task 1 — Mega-menu

The existing navbar now includes “Shop by Category.” At 656px and wider, keyboard focus or hover opens a five-column panel with four links per column. At smaller widths, the same groups are available as independent closed-by-default `<details>` accordions inside the Bootstrap hamburger menu. CSS positioning keeps the panel above the product grid without pushing content down.

## Task 2 — Checkout

`checkout.html` uses two fieldsets with legends, labels connected through `for`/`id`, HTML5 required/type/pattern validation, and date `min`/`max` values based on the exam date. CSS Grid places labels beside inputs at 656px and wider and above inputs below 656px. No JavaScript is used.

## Task 3 — Cart

`script.js` reads each card’s name and price, adds products to an array, updates the cart badge, renders the mini-cart, calculates the total with `reduce()`, and removes items immediately. Each product can be added at most twice (`(56 mod 4) + 2`); its button becomes disabled with “Limit reached.”

## AI tools used

GitHub Copilot / Copilot SDK in VS Code was used to assist with implementation and documentation. The code was reviewed against the requirements and is written using HTML, CSS, and plain JavaScript that can be explained during the live check.
