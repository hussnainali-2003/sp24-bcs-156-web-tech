# Assignment 4 — API, MongoDB, and Login

Same reference site as Assignment 2: [Tesla](https://www.tesla.com/).

This project replaces `products.json` with an Express REST API backed by MongoDB.
MongoDB Compass can be used to view the `tesla_store` database and its
`products`, `users`, and `orders` collections.

## Requirements

- Node.js
- MongoDB Community Server running locally
- MongoDB Compass (optional interface for viewing the database)

## Run

1. Make sure MongoDB is running and open `assignment-4/server` in a terminal.
2. Install dependencies:

   ```powershell
   npm install
   ```

3. Copy `.env.example` to `.env` and set a private `JWT_SECRET`.
4. Seed the product collection:

   ```powershell
   node seed.js
   ```

5. Start the server:

   ```powershell
   npm start
   ```

6. Open `http://localhost:3000`.

The default connection is `mongodb://127.0.0.1:27017/tesla_store`.

## API

- `GET /api/products` — list products from MongoDB.
- `GET /api/products/:id` — return one product.
- `POST /api/auth/register` — create a bcrypt-hashed account and return a JWT.
- `POST /api/auth/login` — verify credentials and return a JWT.
- `POST /api/orders` — protected by Bearer-token middleware; creates an order tied to the logged-in user.

The request logger and `requireAuth` function are custom middleware. API errors use
400, 401, 404, and 500 status codes as appropriate.
