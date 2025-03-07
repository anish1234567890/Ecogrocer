const mongoose = require('mongoose');

// Define Product schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rate: { type: Number, required: true },
  quantity: { type: String, required: true },
  image: { type: String, required: true },
  hoverImage: { type: String, required: true },
});

// Define Farm schema
const farmSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  logo: { type: String, required: true },
  farminside: { type: String, required: true },
  products: [productSchema],
});

// Create Farm model
const Farm = mongoose.model('Farm', farmSchema);

mongoose.model('products',productSchema)

module.exports = Farm;
