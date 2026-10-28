import mongoose from "mongoose";

const cartschema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    items: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },

        size: {
            type: String,
            required: true
        },

        quantity: {
            type: Number,
            default: 1
        },

        price: {
            type: Number,
            required: true
        }
    }],

    totalAmount: {
        type: Number,
        default: 0
    },

    date: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model("Cart", cartschema);