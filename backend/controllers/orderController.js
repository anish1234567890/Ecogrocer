const Order = require('../models/OrderModel'); // Make sure the path is correct

// Add a new order
exports.addOrder = async (req, res) => {
    const { userId, products, totalAmount, address } = req.body; // Extract data from request body
    try {
        const newOrder = new Order({
            userId,
            products: products.map(product => ({
                productId: product.productId,
                name: product.name,
                quantity: product.quantity,
                price: product.price,
                farmName: product.farmName, // Ensure to include the farm name
            })),
            totalAmount,
            address: {
                name: address.name, // Ensure to include the name field
                street: address.street,
                city: address.city,
                postalCode: address.postalCode,
                phoneNumber: address.phoneNumber
            },
            paymentStatus: 'Completed', // Assuming payment is successful
        });
        await newOrder.save();
        res.status(201).json({ message: 'Order added successfully!', orderId: newOrder._id }); // Optionally return the order ID
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ error: 'Failed to add order' });
    }
};

// Get orders for a specific user
exports.getUserOrders = async (req, res) => {
    const { userId } = req.params; // Extract userId from the route parameters
    try {
        const orders = await Order.find({ userId })
            .populate('products.productId') // Populate product details
            .select('-__v'); // Optionally exclude the version key
        res.status(200).json(orders);
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ error: 'Failed to fetch user orders' });
    }
};

// Get all orders (for admin)
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate('userId', 'firstName lastName email') // Populate user details
            .populate('products.productId') // Populate product details
            .select('-__v') // Exclude the version key
            .sort({ timestamp: -1 }); // Optionally sort by timestamp, most recent first

        res.status(200).json(orders);
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ error: 'Failed to fetch all orders' });
    }
};

// Get order details by order ID
// Get order details by order ID
exports.getOrderDetails = async (req, res) => {
    const { orderId } = req.params; // Extract orderId from the route parameters
    try {
        const order = await Order.findById(orderId)
            .populate('userId', 'firstName lastName email') // Populate user details
            .populate('products.productId') // Populate product details
            .select('-__v'); // Optionally exclude the version key

        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        res.status(200).json(order);
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ error: 'Failed to fetch order details' });
    }
};

// controllers/orderController.js
exports.updateOrderStatus = async (req, res) => {
    const { orderId } = req.params;
    const { status } = req.body;

    if (!['Placed', 'Confirmed', 'Rejected', 'Shipped', 'Delivered'].includes(status)) {
        return res.status(400).json({ error: 'Invalid order status' });
    }

    try {
        const order = await Order.findByIdAndUpdate(
            orderId,
            { orderStatus: status },
            { new: true }
        );

        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        res.status(200).json({ message: 'Order status updated', order });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update order status' });
    }
};


