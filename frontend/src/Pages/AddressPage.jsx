import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function AddressPage() {
  const [address, setAddress] = useState({
    name: '',
    street: '',
    city: '',
    postalCode: '',
    phoneNumber: '',
  });
  
  const navigate = useNavigate();
  const location = useLocation();
  
  const { cart, totalAmount } = location.state || { cart: [], totalAmount: 0 };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!/^\d{6}$/.test(address.postalCode)) {
      alert('Postal Code must be exactly 6 digits.');
      return;
    }
    
    if (!/^\d{10}$/.test(address.phoneNumber)) {
      alert('Phone Number must be exactly 10 digits.');
      return;
    }

    localStorage.setItem('address', JSON.stringify(address));
    navigate('/payment', { state: { totalAmount, cart, address } });
  };

  return (
    <div className="address-container">
      <h1>Enter Your Address</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your full name"
            value={address.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="street">Street:</label>
          <input
            type="text"
            id="street"
            name="street"
            placeholder="Enter your street address"
            value={address.street}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="city">City:</label>
          <input
            type="text"
            id="city"
            name="city"
            placeholder="Enter your city"
            value={address.city}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="postalCode">Postal Code:</label>
          <input
            type="text"
            id="postalCode"
            name="postalCode"
            placeholder="6-digit postal code"
            value={address.postalCode}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            placeholder="10-digit phone number"
            value={address.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Proceed to Payment</button>
      </form>
    </div>
  );
}

export default AddressPage;
