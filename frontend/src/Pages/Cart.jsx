import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  const DELIVERY_CHARGE = 5; // Fixed delivery charge

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  // Function to remove an item from the cart
  const removeFromCart = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // Function to change quantity of an item
  const handleQuantityChange = (index, delta) => {
    const updatedCart = cart.map((product, i) => {
      if (i === index) {
        const newQuantity = Math.max((product.selectedQuantity || 1) + delta, 1);
        return { ...product, selectedQuantity: newQuantity };
      }
      return product;
    });
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // Function to calculate the total cost including delivery charge
  const calculateTotal = () => {
    const total = cart.reduce(
      (acc, product) => acc + (product.rate || 0) * (product.selectedQuantity || 1),
      0
    );
    return total + DELIVERY_CHARGE;
  };

  // Handle navigating to the address page
  const handleProceedToAddress = () => {
    const token = sessionStorage.getItem('token'); // Check for the token in sessionStorage
    
    if (token) {
      // If token exists, proceed to address page
      const totalAmount = calculateTotal();
      navigate('/address', { state: { totalAmount, cart } }); // Pass totalAmount and cart
    } else {
      // If no token, redirect to login page
      alert('Please log in to proceed to payment');
      navigate('/login');
    }
  };

  return (
    <div className="cart-container">
      <h1>Cart</h1>
      {cart.length > 0 ? (
        <>
          {cart.map((product, index) => (
            <div key={index} className="cart-item">
              <div>
                <h3>{product.name}</h3>
                <p>Farm: {product.farmName || 'N/A'}</p> {/* Display farm name here */}
                <p>Rate: ${product.rate}</p>
                <p>Quantity: {product.selectedQuantity || 1}</p> {/* Display selectedQuantity */}
                <div className="quantity-controls">
                  <button onClick={() => handleQuantityChange(index, -1)}>-</button>
                  <span>{product.selectedQuantity || 1}</span>
                  <button onClick={() => handleQuantityChange(index, 1)}>+</button>
                </div>
              </div>
              <button className="remove-button" onClick={() => removeFromCart(index)}>Remove</button>
            </div>
          ))}
          <div className="cart-total">
            <h3>Delivery Charge: ${DELIVERY_CHARGE}</h3>
            <h3>Grand Total: ${calculateTotal()}</h3>
          </div>
          <div className="buy-now-container">
            <button className="buy-now-button" onClick={handleProceedToAddress}>Proceed to Address</button> {/* Update button text */}
          </div>
        </>
      ) : (
        <p>Your cart is empty. Start adding some organic products!</p>
      )}
    </div>
  );
}

export default Cart;
