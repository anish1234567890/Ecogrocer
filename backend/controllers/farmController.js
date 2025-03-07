const Farm = require('../models/farmModel');

// Get all farms
const getFarms = async (req, res) => {
  try {
    const farms = await Farm.find();
    res.json(farms);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching farms' });
  }
};

// Create a new farm
const createFarm = async (req, res) => {
  const { name, description, logo, farminside, products } = req.body;

  if (!name || !description || !logo || !farminside || !products) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const newFarm = new Farm({ name, description, logo, farminside, products });
    await newFarm.save();
    res.status(201).json(newFarm);
  } catch (error) {
    res.status(500).json({ error: 'Error creating farm' });
  }
};
// Export controller functions
module.exports = { getFarms, createFarm };
