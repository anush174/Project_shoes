import mongoose from "mongoose";

const productschema = new mongoose.Schema({

    product_name: {
        type: String,
        required: true
    },

    product_qty: {
        type: Number,
        default: 1
    },

    product_image: {
        type: String
    },

    product_price: {
        type: Number,
        required: true
    },

    product_desc: {
        type: String
    },

    brand: {
        type: String
    },

    color: {
        type: String
    },

    sizes: [{
        type: String
    }],

    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Category"
    },

    status: {
        type: String,
        enum: ["available", "out_of_stock", "inactive"],
        default: "available"
    },

    date: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model("Product", productschema);