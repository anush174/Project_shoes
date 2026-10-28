import mongoose from "mongoose";

const orderschema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    items: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        },

        product_name: {
            type: String
        },

        size: {
            type: String
        },

        quantity: {
            type: Number
        },

        price: {
            type: Number
        }
    }],

    totalAmount: {
        type: Number,
        required: true
    },

    shippingAddress: {
        name: String,
        phone: String,
        address: String,
        city: String,
        state: String,
        pincode: String
    },

    orderStatus: {
        type: String,
        enum: [
            "Pending",
            "Confirmed",
            "Packed",
            "Shipped",
            "Out for Delivery",
            "Delivered",
            "Cancelled"
        ],
        default: "Pending"
    },

    date: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model("Order", orderschema);