import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

function MyOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = sessionStorage.getItem('token'); // Use sessionStorage to get the token
        if (!token) {
          navigate('/login'); 
          return;
        }

        const decodedToken = jwtDecode(token);
        const userId = decodedToken.userId; // Ensure your token includes the userId field

        const response = await axios.get(`http://localhost:5000/api/orders/user/${userId}`); // Adjust the endpoint as necessary

        // Check if the response is an array, if not set orders to an empty array
        setOrders(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        setError('Failed to fetch orders. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [navigate]); // Add navigate as a dependency

  const handleViewOrder = (orderId) => {
    navigate(`/order/${orderId}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="my-orders-container">
      <h1>My Orders</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order._id} className="order-item">
              <h2>Order ID: {order._id}</h2>
              <p>Total Amount: ${order.totalAmount}</p>
              <p>Payment Status: {order.paymentStatus}</p>
              <p>
                Address: {order.address.street}, {order.address.city}, {order.address.postalCode}
              </p>
              <button onClick={() => handleViewOrder(order._id)}>View Order Details</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MyOrdersPage;
