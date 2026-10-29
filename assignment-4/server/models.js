const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true, min: 1 },
  image: { type: String, required: true },
  description: { type: String, required: true }
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  passwordHash: { type: String, required: true }
}, { timestamps: true });

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [{
    productId: { type: mongoose.Schema.Types.ObjectId, required: true },
    name: String,
    price: Number,
    quantity: Number
  }],
  total: { type: Number, required: true, min: 1 }
}, { timestamps: true });

module.exports = {
  Product: mongoose.model("Product", productSchema),
  User: mongoose.model("User", userSchema),
  Order: mongoose.model("Order", orderSchema)
};
