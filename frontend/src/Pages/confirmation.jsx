import React from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Confirmation = () => {
  const location = useLocation();
  const { paymentIntent, cart, totalAmount } = location.state || {};

  if (!paymentIntent) {
    return <p>No payment information available.</p>;
  }
  if (paymentIntent.status === 'succeeded'){
    localStorage.removeItem('cart')
  }

  return (
    <motion.div
      className="confirmation-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    > 
      <h1 className="confirmation-title">Thank You for Your Purchase!Order Placed Successfully</h1>
      <h2 className="confirmation-subtitle">Payment Status: {paymentIntent.status}</h2>
      <p className="confirmation-message">Your payment has been processed successfully.</p>

      <div className="order-summary">
        <h3 className="order-summary-title">Order Summary</h3>
        <p><strong>Payment ID:</strong> {paymentIntent.id}</p>
        <p><strong>Total Amount:</strong> ${totalAmount}</p>

        <h4 className="order-items-title">Items Purchased:</h4>
        <ul className="order-items-list">
          {cart.map((item) => (
            <li key={item.id}>
              <span>{item.name} (Quantity: {item.selectedQuantity}) - ${item.rate * item.selectedQuantity}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="confirmation-thank-you">Thank you for supporting us!</p>
    </motion.div>
  );
};

export default Confirmation;
