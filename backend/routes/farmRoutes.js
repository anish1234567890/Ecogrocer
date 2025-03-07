const express = require('express');
const { getFarms, createFarm } = require('../controllers/farmController');

const router = express.Router();

// Define routes
router.get('/', getFarms); // GET /farms
router.post('/', createFarm); // POST /farms

// Export the router
module.exports = router;
