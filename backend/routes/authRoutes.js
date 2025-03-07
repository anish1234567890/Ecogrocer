const express = require('express');
const { signup, login } = require('../controllers/authController');

const router = express.Router();

// Define authentication routes
router.post('/signup', signup); // POST /api/signup
router.post('/login', login);     // POST /api/login

// Export the router
module.exports = router;
