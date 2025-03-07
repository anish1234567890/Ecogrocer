import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function OrderDetail() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Use useNavigate to redirect

  useEffect(() => {
    const fetchOrderDetail = async () => {
      try {
        const token = sessionStorage.getItem('token'); // Use sessionStorage to get the token
        if (!token) {
          navigate('/login'); // Redirect to the login page if not authenticated
          return;
        }

        const response = await axios.get(`http://localhost:5000/api/orders/ordersdetails/${orderId}`); // Adjust the endpoint as necessary
        setOrder(response.data);
      } catch (err) {
        setError('Failed to fetch order details. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetail();
  }, [orderId, navigate]); // Add navigate to the dependency array

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!order) {
    return <div>No order found.</div>;
  }

  return (
    <div className="order-detail-container">
      <h1>Order Detail</h1>
      <h2>Order ID: {order._id}</h2>
      <h3>Order Status: {order.orderStatus}</h3> 
      <p className="timestamp">Timestamp: {new Date(order.timestamp).toLocaleString()}</p>
      <p>Total Amount: ${order.totalAmount}</p>
      <p>Payment Status: {order.paymentStatus}</p>
      
      <h3>Delivery Address</h3>
      <p>
        {order.address.name}<br />
        {order.address.street}, {order.address.city}, {order.address.postalCode}<br />
        Phone: {order.address.phoneNumber}
      </p>
      <h3>Products</h3>
      <ul>
        {order.products.map((product) => (
          <li key={product.productId}>
            <strong>{product.name}</strong> - Quantity: {product.quantity} - Price: ${product.price} - Farmname: {product.farmName}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OrderDetail;
