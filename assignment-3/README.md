# Assignment 3 — Interactive Tesla Vehicles

Same reference site as Assignment 2: [Tesla](https://www.tesla.com/).

## Features

- `products.json` contains the vehicle catalog.
- `fetch()` loads the catalog and renders product cards dynamically.
- Add to Cart stores products in a JavaScript array and persists the current cart in `localStorage` for the cart and checkout pages.
- `cart.html` supports quantity changes, remove actions, and a `reduce()` total.
- `checkout.html` validates name, email, phone, and address with regular expressions and blocks invalid submission.

## Files

- `index.html`, `cart.html`, and `checkout.html`
- `script.js`, `styles.css`, and `products.json`
- `completion.pdf` with responsive, cart, validation, and console evidence

## How to run

Open the `assignment-3` folder in VS Code and use the **Live Server** extension on
`index.html`. A local server is required because the Fetch API may be blocked when
the page is opened directly with a `file://` URL.

Alternatively, if Node.js is installed:

```powershell
cd "C:\Users\Ishtiaq Hussain\Desktop\WEB\assignment-3"
npx serve .
```

Open the local URL shown in the terminal.
