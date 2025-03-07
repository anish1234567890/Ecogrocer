import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import jwtDecode from "jwt-decode";
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';

const stripePromise = loadStripe('pk_test_51QHUz8BAjrmG4nldNmnSxX0tqe47nD4zf6wa2tNads7fB7K4seiO5RAvCsdLEM3kE5asbWhg1I3GNipEX7c65JJ40029wnv7Tr');

const CheckoutForm = ({ totalAmount, cart, onPaymentSuccess, setPaymentStatus }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setPaymentStatus('');

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    const response = await fetch('http://localhost:5000/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: totalAmount * 100, currency: 'usd' }),
    });

    if (!response.ok) {
      setLoading(false);
      setPaymentStatus('Failed to create payment intent. Please try again.');
      return;
    }

    const { clientSecret } = await response.json();
    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card: cardElement },
    });

    if (error) {
      setPaymentStatus('Payment failed: ' + error.message);
    } else if (paymentIntent.status === 'succeeded') {
      setPaymentStatus('Payment succeeded!');
      onPaymentSuccess(paymentIntent);
    }

    setLoading(false);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="checkout-form space-y-4"
    >
      <CardElement className="card-element" />
      <motion.button
        type="submit"
        disabled={!stripe || loading}
        className={`payment-button w-full py-2 text-white rounded ${loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'} transition duration-200`}
      >
        {loading ? <span>Loading...</span> : <span>Pay</span>}
      </motion.button>
    </motion.form>
  );
};

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [totalAmount, setTotalAmount] = useState(0);
  const [cart, setCart] = useState([]);
  const [address, setAddress] = useState({});
  const [userId, setUserId] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState('');

  useEffect(() => {
    const token = sessionStorage.getItem('token'); // Get the token from sessionStorage
    if (!token) {
      // Redirect to login if no token
      navigate('/login');
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      setUserId(decodedToken.userId);
    } catch (error) {
      // Handle token validation error
      console.error("Token validation error:", error);
      navigate('/login');
      return;
    }

    const cartData = location.state?.cart || JSON.parse(localStorage.getItem('cart')) || [];
    const addressData = location.state?.address || JSON.parse(localStorage.getItem('address')) || {};
    setCart(cartData);
    setAddress(addressData);

    const total = cartData.reduce((acc, product) => acc + product.rate * product.selectedQuantity, 0) + 5;
    setTotalAmount(total);
  }, [location.state, navigate]);

  const handlePaymentSuccess = async (paymentIntent) => {
    if (!userId) {
      console.error("User ID not found");
      return;
    }

    const orderData = {
      userId,
      paymentId: paymentIntent.id,
      totalAmount,
      products: cart.map(product => ({
        productId: product._id,
        name: product.name,
        quantity: product.selectedQuantity,
        price: product.rate,
        farmName: product.farmName 
      })),
      address: {
        name: address.name,
        street: address.street,
        city: address.city,
        postalCode: address.postalCode,
        phoneNumber: address.phoneNumber
      },
    };

    console.log(orderData); // Check the structure before sending

    try {
      const response = await fetch('http://localhost:5000/api/orders/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error('Failed to save order');
      }

      const result = await response.json();

      if (result.orderId) {
        console.log('Order saved successfully:', result);
        navigate('/confirmation', { state: { paymentIntent, cart, totalAmount } });
      } else {
        console.error('Error saving order:', result);
        setPaymentStatus('Error saving order. Please try again.');
      }
    } catch (error) {
      console.error(error);
      setPaymentStatus('Error processing payment. Please try again.');
    }
  };

  return (
    <div className="payment-container">
      <motion.div
        className="payment-page"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="payment-title">Payment Page</h1>
        <p className="payment-description">Complete your purchase by entering your payment details below.</p>
        <p className="total-amount">Total: ${totalAmount}</p>
        {paymentStatus && (
          <p className={`payment-status text-center ${paymentStatus.includes('failed') ? 'text-red-600' : 'text-green-600'}`}>
            {paymentStatus}
          </p>
        )}
        <Elements stripe={stripePromise}>
          <CheckoutForm 
            totalAmount={totalAmount} 
            cart={cart} 
            onPaymentSuccess={handlePaymentSuccess} 
            setPaymentStatus={setPaymentStatus}
          />
        </Elements>
      </motion.div>
    </div>
  );
};

export default Payment;
