import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/orders/admin');
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, []);

    const handleViewDetails = (orderId) => {
        navigate(`/admin/orders/${orderId}`);
    };

    return (
        <div className="admin-dashboard">
            <h1 className="admin-dashboard-title">Admin Dashboard</h1>
            <h2 className="admin-dashboard-subtitle">Orders</h2>
            {orders.length > 0 ? (
                <table className="admin-dashboard-table">
                    <thead>
                        <tr>
                            <th className="admin-dashboard-table-header">Order ID</th>
                            <th className="admin-dashboard-table-header">User</th>
                            <th className="admin-dashboard-table-header">Total Amount</th>
                            <th className="admin-dashboard-table-header">Payment Status</th>
                            <th className="admin-dashboard-table-header">Timestamp</th>
                            <th className="admin-dashboard-table-header">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order._id} className="admin-dashboard-table-row">
                                <td className="admin-dashboard-table-cell">{order._id}</td>
                                <td className="admin-dashboard-table-cell">{order.userId.firstName} {order.userId.lastName}</td>
                                <td className="admin-dashboard-table-cell">${order.totalAmount}</td>
                                <td className="admin-dashboard-table-cell">{order.paymentStatus}</td>
                                <td className="admin-dashboard-table-cell">{new Date(order.timestamp).toLocaleString()}</td>
                                <td className="admin-dashboard-table-cell">
                                    <button className="admin-dashboard-button" onClick={() => handleViewDetails(order._id)}>
                                        View Details
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="admin-dashboard-no-orders">No orders found.</p>
            )}
        </div>
    );
}

export default AdminDashboard;
    