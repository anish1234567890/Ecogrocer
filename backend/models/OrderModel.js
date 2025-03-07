const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    products: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'products', required: true },
            name: { type: String, required: true },
            farmName: { type: String, required: true }, // Add farmName here
            quantity: { type: Number, required: true },
            price: { type: Number, required: true },
        }
    ],
    totalAmount: { type: Number, required: true },
    address: {
        name: { type: String, required: true },
        street: { type: String, required: true },
        city: { type: String, required: true },
        postalCode: { type: String, required: true },
        phoneNumber: { type: String, required: true },
    },
    paymentStatus: { type: String, enum: ['Pending', 'Completed'], default: 'Pending' },
    orderStatus: { type: String, enum: ['Placed', 'Confirmed', 'Rejected', 'Shipped', 'Delivered'], default: 'Placed' }, // New field
    timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', orderSchema);
