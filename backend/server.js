require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require('./config/db'); // MongoDB connection
const farmRoutes = require('./routes/farmRoutes'); // Farm routes
const authRoutes = require('./routes/authRoutes'); // Auth routes
const orderRoutes = require('./routes/orderRoutes');
const Stripe = require('stripe');

const app = express();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// Middleware
app.use(cors({ origin: '*' }));
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/farms', farmRoutes); // Farm routes
app.use('/api/auth', authRoutes);   // Auth routes
app.use('/api/orders', orderRoutes);

// Payment processing route
app.post('/api/create-payment-intent', async (req, res) => {
  const { amount, currency } = req.body;

  if (!amount || !currency) { 
    return res.status(400).send({ error: 'Amount and currency are required' });
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, // Amount already in cents
      currency: currency,
    });

    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Stripe error:', error);
    res.status(500).send({ error: error.message });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});