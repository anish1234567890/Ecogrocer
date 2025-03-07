import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function AdminOrderDetails() {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/orders/ordersdetails/${orderId}`);
                setOrder(response.data);
            } catch (error) {
                console.error('Error fetching order details:', error);
            }
        };

        fetchOrderDetails();
    }, [orderId]);

    const updateOrderStatus = async (status) => {
        try {
            const response = await axios.put(`http://localhost:5000/api/orders/update-status/${orderId}`, { status });
            setOrder(response.data.order);
            alert(`Order status updated to ${status}`);
        } catch (error) {
            console.error('Error updating order status:', error);
            alert('Failed to update order status');
        }
    };

    if (!order) {
        return <p className="loading">Loading...</p>;
    }

    return (
        <div className="admin-order-details">
            <h1 className="order-title">Order Details</h1>
            <h2 className="order-id">Order ID: {order._id}</h2>
            <h3 className="user-id">User ID: {order.userId._id}</h3>
            <h3 className="user-name">User: {order.userId.firstName} {order.userId.lastName}</h3>
            <h4 className="product-title">Products:</h4>
            <ul className="product-list">
                {order.products.map(product => (
                    <li className="product-item" key={product._id}>
                        {product.name} (Farm: {product.farmName}, Quantity: {product.quantity}, Price: ${product.price})
                    </li>
                ))}
            </ul>
            <h4 className="total-amount">Total Amount: ${order.totalAmount}</h4>
            <h4 className="address-title">Address:</h4>
            <p className="address-details">{order.address.name}, {order.address.street}, {order.address.city}, {order.address.postalCode}, {order.address.phoneNumber}</p>
            <h4 className="payment-status">Payment Status: {order.paymentStatus}</h4>
            <h4 className="order-status">Order Status: {order.orderStatus}</h4>

            <h4 className="status-update-title">Update Order Status:</h4>
            <div className="status-buttons">
                {['Placed', 'Confirmed', 'Rejected', 'Shipped', 'Delivered'].map(status => (
                    <button
                        key={status}
                        onClick={() => updateOrderStatus(status)}
                        className={`status-button ${status.toLowerCase()}`}
                    >
                        {status}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default AdminOrderDetails;
