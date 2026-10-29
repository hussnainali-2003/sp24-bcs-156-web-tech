require("dotenv").config();
const path = require("path");
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { Product, User, Order } = require("./models");

const app = express();
const port = process.env.PORT || 3000;
const jwtSecret = process.env.JWT_SECRET;
const mongoUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/tesla_store";
if (!jwtSecret) throw new Error("JWT_SECRET is required.");

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.path}`);
  next();
});

function createToken(user) {
  return jwt.sign({ id: user._id.toString(), email: user.email }, jwtSecret, { expiresIn: "2h" });
}

function requireAuth(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) return res.status(401).json({ error: "Login is required." });
  try {
    req.user = jwt.verify(header.slice(7), jwtSecret);
    next();
  } catch {
    return res.status(401).json({ error: "Invalid or expired token." });
  }
}

app.get("/api/products", async (req, res, next) => {
  try { res.json(await Product.find().select("name price image description").sort({ _id: 1 })); } catch (error) { next(error); }
});

app.get("/api/products/:id", async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(404).json({ error: "Product not found." });
    const product = await Product.findById(req.params.id).select("name price image description");
    if (!product) return res.status(404).json({ error: "Product not found." });
    res.json(product);
  } catch (error) { next(error); }
});

app.post("/api/auth/register", async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password || password.length < 6) return res.status(400).json({ error: "Name, email, and a 6-character password are required." });
  try {
    const passwordHash = await bcrypt.hash(password, 12);
    const user = await User.create({ name: name.trim(), email: email.trim().toLowerCase(), passwordHash });
    res.status(201).json({ user: { id: user._id, name: user.name, email: user.email }, token: createToken(user) });
  } catch (error) {
    if (error.code === 11000) return res.status(400).json({ error: "An account with that email already exists." });
    next(error);
  }
});

app.post("/api/auth/login", async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: "Email and password are required." });
  try {
    const user = await User.findOne({ email: email.trim().toLowerCase() });
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) return res.status(401).json({ error: "Invalid email or password." });
    res.json({ user: { id: user._id, name: user.name, email: user.email }, token: createToken(user) });
  } catch (error) { next(error); }
});

app.post("/api/orders", requireAuth, async (req, res, next) => {
  const { items } = req.body;
  if (!Array.isArray(items) || !items.length) return res.status(400).json({ error: "The order must contain at least one item." });
  try {
    const orderItems = [];
    for (const item of items) {
      if (!mongoose.isValidObjectId(item.productId) || !Number.isInteger(Number(item.quantity)) || Number(item.quantity) < 1) return res.status(400).json({ error: "Invalid order item." });
      const product = await Product.findById(item.productId);
      if (!product) return res.status(400).json({ error: "One or more products are invalid." });
      orderItems.push({ productId: product._id, name: product.name, price: product.price, quantity: Number(item.quantity) });
    }
    const total = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const order = await Order.create({ userId: req.user.id, items: orderItems, total });
    res.status(201).json({ order: { id: order._id, total: order.total, createdAt: order.createdAt } });
  } catch (error) { next(error); }
});

app.use(express.static(path.join(__dirname, "..", "frontend")));
app.use((error, req, res, next) => { console.error(error); res.status(500).json({ error: "Internal server error." }); });

mongoose.connect(mongoUri).then(() => app.listen(port, () => console.log(`Tesla API running at http://localhost:${port}`))).catch((error) => { console.error("MongoDB connection failed:", error.message); process.exit(1); });
