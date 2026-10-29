require("dotenv").config();
const mongoose = require("mongoose");
const { Product } = require("./models");

const products = [
  ["Model S", 89990, "vehicle-1.jpg", "Long-range electric sedan."],
  ["Model 3", 42490, "vehicle-2.jpg", "Everyday electric performance."],
  ["Model X", 99990, "vehicle-3.jpg", "Room for every journey."],
  ["Model Y", 44990, "vehicle-4.jpg", "Versatile electric SUV."],
  ["Cybertruck", 79990, "vehicle-5.jpg", "Built for any adventure."],
  ["Roadster", 200000, "vehicle-1.jpg", "Performance without compromise."],
  ["Tesla Semi", 95000, "vehicle-6.jpg", "Electric freight transport."],
  ["Model S Plaid", 124990, "vehicle-1.jpg", "Track-ready electric power."],
  ["Model 3 Performance", 54990, "vehicle-2.jpg", "Sharper acceleration and handling."],
  ["Model X Plaid", 114990, "vehicle-3.jpg", "SUV practicality with Plaid power."],
  ["Model Y Performance", 54490, "vehicle-4.jpg", "Fast, practical electric utility."],
  ["Cybertruck AWD", 99990, "vehicle-5.jpg", "All-wheel-drive electric utility."],
  ["Model 3 Long Range", 47490, "vehicle-2.jpg", "Efficient long-distance travel."],
  ["Model Y Long Range", 49990, "vehicle-4.jpg", "Extra range for every journey."],
  ["Cybercab", 60000, "vehicle-5.jpg", "A future-ready city ride."]
].map(([name, price, image, description]) => ({ name, price, image, description }));

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/tesla_store");
  await Product.deleteMany({});
  await Product.insertMany(products);
  console.log(`Seeded ${products.length} products.`);
  await mongoose.disconnect();
}

seed().catch((error) => { console.error(error); process.exitCode = 1; });
